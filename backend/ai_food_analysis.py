"""
Rule-based AI Food Analysis and Rescue Priority engine.

Deterministic and explainable: derives structured food insights and a
0-100 rescue priority score from data the donor already provides
(category, storage condition, quantity, preparation time, pickup
deadline). No external API calls are made, so this can never be a point
of failure for donation creation -- analyze_donation() catches every
exception internally and returns None on any unexpected input.
"""

from datetime import datetime, timezone

CATEGORY_PROFILES = {
    "Cooked Meals": {
        "food_category": "Cooked Meal",
        "perishability": "High",
        "storage_recommendation": "Keep refrigerated or hot-held above 60°C; do not leave at room temperature.",
        "handling_suggestion": "Distribute as soon as possible and maintain proper temperature control until collection.",
    },
    "Dairy & Beverages": {
        "food_category": "Dairy & Beverages",
        "perishability": "High",
        "storage_recommendation": "Keep refrigerated at all times to prevent spoilage.",
        "handling_suggestion": "Prioritize early pickup and keep chilled during transport.",
    },
    "Bakery & Surplus": {
        "food_category": "Bakery Item",
        "perishability": "Medium",
        "storage_recommendation": "Store in a dry, room-temperature container away from moisture.",
        "handling_suggestion": "Distribute within the day for best quality; keep packaging sealed.",
    },
    "Fresh Produce / Vegetables": {
        "food_category": "Fresh Produce",
        "perishability": "Medium",
        "storage_recommendation": "Keep cool and dry, ideally refrigerated if not distributed same-day.",
        "handling_suggestion": "Inspect for spoilage before distribution and use within a couple of days.",
    },
    "Packaged & Shelf Stable": {
        "food_category": "Packaged / Shelf-Stable",
        "perishability": "Low",
        "storage_recommendation": "Store at room temperature in a dry area; no special handling required.",
        "handling_suggestion": "Safe for an extended distribution timeline; check packaging integrity.",
    },
}

DEFAULT_PROFILE = {
    "food_category": "General Food Item",
    "perishability": "Medium",
    "storage_recommendation": "Store appropriately based on food type and keep away from heat sources.",
    "handling_suggestion": "Distribute promptly and inspect for freshness before collection.",
}

PERISHABILITY_POINTS = {"High": 30, "Medium": 18, "Low": 6}

STORAGE_RISK_POINTS = {
    "Insulated Thermal Containers (Hot)": 10,
    "Refrigerated (Chilled)": 6,
    "Frozen Storage": 2,
    "Room Temperature (Dry Crates)": 2,
}

PERISHABILITY_REASON = {
    "High": "the food is highly perishable",
    "Medium": "the food has moderate perishability",
    "Low": "the food is low-perishability / shelf-stable",
}


def _parse_timestamp(value):
    if not value or not isinstance(value, str):
        return None
    try:
        normalized = value.replace("Z", "+00:00")
        dt = datetime.fromisoformat(normalized)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt
    except ValueError:
        return None


def _hours_since(dt, now):
    if dt is None:
        return None
    return (now - dt).total_seconds() / 3600


def _hours_until(dt, now):
    if dt is None:
        return None
    return (dt - now).total_seconds() / 3600


def _score_time_remaining(hours_remaining):
    if hours_remaining is None:
        return 12, "the pickup deadline was not specified"
    if hours_remaining <= 0.5:
        return 30, "the pickup deadline has been reached or almost reached"
    if hours_remaining <= 2:
        return 22, f"only {hours_remaining:.1f}h remains until the pickup deadline"
    if hours_remaining <= 6:
        return 12, f"{hours_remaining:.1f}h remains until the pickup deadline"
    return 4, f"{hours_remaining:.1f}h remains until the pickup deadline"


def _score_time_since_prep(hours_since):
    if hours_since is None:
        return 8, "the preparation time was not specified"
    hours_since = max(hours_since, 0)
    if hours_since >= 6:
        return 20, f"it was prepared {hours_since:.1f}h ago"
    if hours_since >= 3:
        return 12, f"it was prepared {hours_since:.1f}h ago"
    if hours_since >= 1:
        return 6, f"it was prepared {hours_since:.1f}h ago"
    return 2, f"it was prepared recently ({hours_since:.1f}h ago)"


def _score_quantity(estimated_meals):
    try:
        meals = float(estimated_meals)
    except (TypeError, ValueError):
        return 1
    if meals >= 100:
        return 10
    if meals >= 50:
        return 7
    if meals >= 20:
        return 4
    return 1


def _priority_level(score):
    if score >= 70:
        return "High"
    if score >= 40:
        return "Medium"
    return "Low"


def _analyze(donation):
    category = donation.get("category") or ""
    profile = CATEGORY_PROFILES.get(category, DEFAULT_PROFILE)

    food_name = (donation.get("food_name") or "").strip()
    food_type = food_name if food_name else profile["food_category"]

    now = datetime.now(timezone.utc)
    hours_since_prep = _hours_since(_parse_timestamp(donation.get("prepared_at")), now)
    hours_remaining = _hours_until(_parse_timestamp(donation.get("pickup_end")), now)

    perishability_pts = PERISHABILITY_POINTS.get(profile["perishability"], 12)
    remaining_pts, remaining_reason = _score_time_remaining(hours_remaining)
    prep_pts, prep_reason = _score_time_since_prep(hours_since_prep)
    storage_pts = STORAGE_RISK_POINTS.get(donation.get("storage_condition"), 5)
    quantity_pts = _score_quantity(donation.get("estimated_meals"))

    score = int(round(perishability_pts + remaining_pts + prep_pts + storage_pts + quantity_pts))
    score = max(0, min(100, score))
    level = _priority_level(score)

    perishability_reason = PERISHABILITY_REASON.get(profile["perishability"], PERISHABILITY_REASON["Medium"])
    reason = f"{level} priority because {perishability_reason}, {prep_reason}, and {remaining_reason}."

    return {
        "ai_food_category": profile["food_category"],
        "ai_food_type": food_type,
        "ai_perishability": profile["perishability"],
        "ai_storage_recommendation": profile["storage_recommendation"],
        "ai_handling_suggestion": profile["handling_suggestion"],
        "ai_priority_score": score,
        "ai_priority_level": level,
        "ai_priority_reason": reason,
        "ai_analyzed_at": now.isoformat(),
    }


def analyze_donation(donation):
    """
    Returns a dict of ai_* fields derived from `donation`, or None if
    analysis could not be completed. Never raises.
    """
    try:
        return _analyze(donation)
    except Exception:
        return None
