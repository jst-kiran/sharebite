from flask import Blueprint, request, jsonify
from db import USE_MOCK_DATA, get_db_client, verify_auth_token
from data.mock_users import users
from ai_food_analysis import analyze_donation

donation_bp = Blueprint("donation_bp", __name__)

# In-memory mock databases when USE_MOCK_DATA = true
mock_donations = [
    {
        "id": "don-01",
        "donor_id": "dnr-01",
        "food_name": "Fresh Vegetable Meal Boxes",
        "category": "Cooked Meals",
        "quantity": 35,
        "quantity_unit": "boxes",
        "estimated_meals": 35,
        "is_veg": True,
        "prepared_at": "2026-08-06T12:30:00Z",
        "storage_condition": "Insulated Thermal Containers (Hot)",
        "pickup_address": "42 Eco Avenue, Suite 100, Downtown",
        "contact_phone": "+1 (555) 234-5678",
        "pickup_start": "2026-08-06T16:00:00Z",
        "pickup_end": "2026-08-06T19:00:00Z",
        "description": "Packed wholesome lunch boxes prepared for a corporate event.",
        "image_url": None,
        "special_instructions": "Ring service bell at rear loading dock B.",
        "status": "accepted",
        "posted_date": "2026-08-06",
        "created_at": "2026-08-06T13:15:00Z",
        "updated_at": "2026-08-06T14:40:00Z",
    },
    {
        "id": "don-02",
        "donor_id": "dnr-01",
        "food_name": "Assorted Bakery Bread & Rolls",
        "category": "Bakery & Surplus",
        "quantity": 25,
        "quantity_unit": "kg",
        "estimated_meals": 50,
        "is_veg": True,
        "prepared_at": "2026-08-06T06:00:00Z",
        "storage_condition": "Room Temperature (Dry Crates)",
        "pickup_address": "108 Harvest Lane, West End",
        "contact_phone": "+1 (555) 876-5432",
        "pickup_start": "2026-08-06T08:00:00Z",
        "pickup_end": "2026-08-06T20:00:00Z",
        "description": "Freshly baked whole wheat loaves, dinner rolls, and fruit muffins.",
        "image_url": None,
        "special_instructions": "Ask for Manager Mark at front counter.",
        "status": "available",
        "posted_date": "2026-08-06",
        "created_at": "2026-08-06T15:30:00Z",
        "updated_at": "2026-08-06T15:30:00Z",
    },
    {
        "id": "don-03",
        "donor_id": "dnr-01",
        "food_name": "Steamed Dal & Basmati Rice",
        "category": "Cooked Meals",
        "quantity": 60,
        "quantity_unit": "servings",
        "estimated_meals": 60,
        "is_veg": True,
        "prepared_at": "2026-08-05T19:00:00Z",
        "storage_condition": "Refrigerated (Chilled)",
        "pickup_address": "15 Community Way, Midtown",
        "contact_phone": "+1 (555) 345-6789",
        "pickup_start": "2026-08-05T20:00:00Z",
        "pickup_end": "2026-08-05T22:00:00Z",
        "description": "Large batch of aromatic basmati rice and yellow lentil soup.",
        "image_url": None,
        "special_instructions": "Use kitchen side door entrance.",
        "status": "completed",
        "posted_date": "2026-08-05",
        "created_at": "2026-08-05T20:00:00Z",
        "updated_at": "2026-08-05T22:00:00Z",
    },
]

mock_claims = [
    {
        "id": "clm-01",
        "donation_id": "don-01",
        "ngo_id": "ngo-01",
        "ngo_name": "Helping Hands Foundation",
        "status": "accepted",
        "requested_at": "2026-08-06T13:30:00Z",
        "accepted_at": "2026-08-06T14:40:00Z",
        "rejected_at": None,
        "completed_at": None,
        "notes": "Dispatching van at 4:30 PM",
    },
    {
        "id": "clm-02",
        "donation_id": "don-03",
        "ngo_id": "ngo-02",
        "ngo_name": "City Food Bank Network",
        "status": "completed",
        "requested_at": "2026-08-05T20:30:00Z",
        "accepted_at": "2026-08-05T20:35:00Z",
        "rejected_at": None,
        "completed_at": "2026-08-05T22:00:00Z",
        "notes": "Distributed to 60 individuals",
    },
]


def _get_auth_user(req):
    auth_header = req.headers.get("Authorization")
    return verify_auth_token(auth_header)


@donation_bp.route("/donor/stats", methods=["GET"])
def get_donor_stats():
    user = _get_auth_user(request)
    if not user:
        return jsonify({"success": False, "message": "Unauthorized access."}), 401

    donor_id = user["id"]

    if USE_MOCK_DATA:
        donor_donations = [d for d in mock_donations if d["donor_id"] == donor_id]
        donation_ids = {d["id"] for d in donor_donations}

        total_count = len(donor_donations)
        pending_claims_count = len([
            c for c in mock_claims if c["donation_id"] in donation_ids and c["status"] == "pending"
        ])
        accepted_claims_count = len([
            c for c in mock_claims if c["donation_id"] in donation_ids and c["status"] == "accepted"
        ])
        completed_count = len([
            d for d in donor_donations if d["status"] == "completed"
        ])

        return jsonify({
            "success": True,
            "stats": {
                "total": total_count,
                "pending": pending_claims_count,
                "accepted": accepted_claims_count,
                "completed": completed_count,
            }
        })

    # Real Supabase DB queries
    try:
        client = get_db_client()
        donations_res = client.table("donations").select("id, status").eq("donor_id", donor_id).execute()
        donations_list = donations_res.data or []
        donor_donation_ids = [d["id"] for d in donations_list]

        total_count = len(donations_list)
        completed_count = len([d for d in donations_list if d.get("status") == "completed"])

        pending_claims_count = 0
        accepted_claims_count = 0

        if donor_donation_ids:
            claims_res = client.table("donation_claims").select("id, status").in_("donation_id", donor_donation_ids).execute()
            claims_list = claims_res.data or []
            pending_claims_count = len([c for c in claims_list if c.get("status") == "pending"])
            accepted_claims_count = len([c for c in claims_list if c.get("status") == "accepted"])

        return jsonify({
            "success": True,
            "stats": {
                "total": total_count,
                "pending": pending_claims_count,
                "accepted": accepted_claims_count,
                "completed": completed_count,
            }
        })
    except Exception as e:
        return jsonify({"success": False, "message": f"Database error: {str(e)}"}), 500


@donation_bp.route("/donations", methods=["GET"])
def list_donations():
    user = _get_auth_user(request)
    if not user:
        return jsonify({"success": False, "message": "Unauthorized access."}), 401

    status_filter = request.args.get("status")

    if USE_MOCK_DATA:
        items = [d for d in mock_donations if d["donor_id"] == user["id"]]
        if status_filter and status_filter.lower() != "all":
            items = [d for d in items if d["status"].lower() == status_filter.lower()]

        # Attach claim summary
        for item in items:
            item_claims = [c for c in mock_claims if c["donation_id"] == item["id"]]
            accepted_claim = next((c for c in item_claims if c["status"] == "accepted"), None)
            item["ngoName"] = accepted_claim["ngo_name"] if accepted_claim else None
            item["claimCount"] = len(item_claims)

        return jsonify({"success": True, "donations": items})

    try:
        client = get_db_client()
        if user.get("role") == "ngo":
            query = client.table("donations").select("*, donation_claims(*)")
        else:
            query = client.table("donations").select("*, donation_claims(*)").eq("donor_id", user["id"])

        if status_filter and status_filter.lower() != "all":
            query = query.eq("status", status_filter.lower())
        res = query.order("created_at", desc=True).execute()

        return jsonify({"success": True, "donations": res.data or []})
    except Exception as e:
        return jsonify({"success": False, "message": f"Database error: {str(e)}"}), 500


@donation_bp.route("/donations", methods=["POST"])
def create_donation():
    user = _get_auth_user(request)
    if not user:
        return jsonify({"success": False, "message": "Unauthorized access."}), 401

    data = request.get_json() or {}

    # Validation
    required_fields = ["food_name", "category", "quantity", "quantity_unit", "estimated_meals", "pickup_address"]
    missing = [f for f in required_fields if not data.get(f)]
    if missing:
        return jsonify({"success": False, "message": f"Missing required fields: {', '.join(missing)}"}), 400

    new_donation = {
        "donor_id": user["id"],
        "food_name": data["food_name"],
        "category": data.get("category", "Cooked Meals"),
        "quantity": float(data["quantity"]),
        "quantity_unit": data.get("quantity_unit", "boxes"),
        "estimated_meals": int(data["estimated_meals"]),
        "is_veg": data.get("is_veg", True),
        "prepared_at": data.get("prepared_at", "2026-08-06T12:00:00Z"),
        "storage_condition": data.get("storage_condition", "Room Temperature"),
        "pickup_address": data["pickup_address"],
        "contact_phone": data.get("contact_phone", ""),
        "pickup_start": data.get("pickup_start", "2026-08-06T14:00:00Z"),
        "pickup_end": data.get("pickup_end", "2026-08-06T18:00:00Z"),
        "description": data.get("description", ""),
        "image_url": data.get("image_url"),
        "special_instructions": data.get("special_instructions", ""),
        "status": "available",
        "posted_date": data.get("posted_date", "2026-08-06"),
    }

    # AI Food Analysis + Rescue Priority (rule-based, deterministic).
    # Never blocks donation creation: on any failure the donation is
    # still saved without ai_* fields.
    try:
        ai_result = analyze_donation(new_donation)
        if ai_result:
            new_donation.update(ai_result)
    except Exception:
        pass

    if USE_MOCK_DATA:
        new_donation["id"] = f"don-0{len(mock_donations) + 1}"
        new_donation["created_at"] = "2026-08-06T16:00:00Z"
        new_donation["updated_at"] = "2026-08-06T16:00:00Z"
        mock_donations.insert(0, new_donation)
        return jsonify({"success": True, "donation": new_donation}), 201

    try:
        client = get_db_client()
        try:
            res = client.table("donations").insert(new_donation).execute()
        except Exception:
            # ai_* columns may not exist yet if the Supabase migration
            # hasn't been applied -- retry without them so the core
            # donor -> NGO flow keeps working regardless.
            fallback_donation = {k: v for k, v in new_donation.items() if not k.startswith("ai_")}
            res = client.table("donations").insert(fallback_donation).execute()
        created = res.data[0] if res.data else new_donation
        return jsonify({"success": True, "donation": created}), 201
    except Exception as e:
        return jsonify({"success": False, "message": f"Database error: {str(e)}"}), 500


@donation_bp.route("/donations/<donation_id>", methods=["GET"])
def get_donation(donation_id):
    user = _get_auth_user(request)
    if not user:
        return jsonify({"success": False, "message": "Unauthorized access."}), 401

    if USE_MOCK_DATA:
        donation = next((d for d in mock_donations if d["id"] == donation_id), None)
        if not donation:
            return jsonify({"success": False, "message": "Donation not found."}), 404

        claims = [c for c in mock_claims if c["donation_id"] == donation_id]
        return jsonify({"success": True, "donation": donation, "claims": claims})

    try:
        client = get_db_client()
        res = client.table("donations").select("*, donation_claims(*)").eq("id", donation_id).execute()
        if not res.data:
            return jsonify({"success": False, "message": "Donation not found."}), 404
        return jsonify({"success": True, "donation": res.data[0]})
    except Exception as e:
        return jsonify({"success": False, "message": f"Database error: {str(e)}"}), 500


@donation_bp.route("/donations/<donation_id>/claims", methods=["POST"])
def create_claim(donation_id):
    user = _get_auth_user(request)
    if not user or user.get("role") != "ngo":
        return jsonify({"success": False, "message": "Only NGOs can create donation claims."}), 403

    data = request.get_json() or {}

    new_claim = {
        "donation_id": donation_id,
        "ngo_id": user["id"],
        "status": "pending",
        "notes": data.get("notes", ""),
    }

    if USE_MOCK_DATA:
        new_claim["id"] = f"clm-0{len(mock_claims) + 1}"
        new_claim["ngo_name"] = "Helping Hands Foundation"
        new_claim["requested_at"] = "2026-08-06T16:00:00Z"
        mock_claims.append(new_claim)
        return jsonify({"success": True, "claim": new_claim}), 201

    try:
        client = get_db_client()
        res = client.table("donation_claims").insert(new_claim).execute()
        return jsonify({"success": True, "claim": res.data[0] if res.data else new_claim}), 201
    except Exception as e:
        return jsonify({"success": False, "message": f"Database error: {str(e)}"}), 500


@donation_bp.route("/claims/<claim_id>", methods=["PATCH"])
def update_claim_status(claim_id):
    user = _get_auth_user(request)
    if not user:
        return jsonify({"success": False, "message": "Unauthorized access."}), 401

    data = request.get_json() or {}
    new_status = data.get("status")
    if not new_status:
        return jsonify({"success": False, "message": "Missing status parameter."}), 400

    if USE_MOCK_DATA:
        claim = next((c for c in mock_claims if c["id"] == claim_id), None)
        if not claim:
            return jsonify({"success": False, "message": "Claim not found."}), 404
        claim["status"] = new_status
        if new_status == "accepted":
            # update donation status to accepted
            donation = next((d for d in mock_donations if d["id"] == claim["donation_id"]), None)
            if donation:
                donation["status"] = "accepted"
        return jsonify({"success": True, "claim": claim})

    try:
        client = get_db_client()
        res = client.table("donation_claims").update({"status": new_status}).eq("id", claim_id).execute()
        if new_status == "accepted" and res.data:
            donation_id = res.data[0].get("donation_id")
            if donation_id:
                client.table("donations").update({"status": "accepted"}).eq("id", donation_id).execute()
        return jsonify({"success": True, "claim": res.data[0] if res.data else {}})
    except Exception as e:
        return jsonify({"success": False, "message": f"Database error: {str(e)}"}), 500
