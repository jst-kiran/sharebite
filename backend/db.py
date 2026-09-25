import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

USE_MOCK_DATA = os.getenv("USE_MOCK_DATA", "true").lower() == "true"

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY", "")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY", "")

supabase: Client = None

if not USE_MOCK_DATA:
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY or "placeholder" in SUPABASE_URL:
        raise RuntimeError(
            "USE_MOCK_DATA is set to FALSE, but valid SUPABASE_URL and SUPABASE_SERVICE_KEY are not configured in backend/.env"
        )
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    except Exception as e:
        raise RuntimeError(f"Failed to initialize Supabase client: {str(e)}")


def get_db_client():
    """
    Returns the initialized Supabase client if USE_MOCK_DATA is false.
    Raises RuntimeError if DB connection is required but missing.
    """
    if USE_MOCK_DATA:
        return None
    if supabase is None:
        raise RuntimeError("Database connection unavailable while USE_MOCK_DATA=false.")
    return supabase


def verify_auth_token(auth_header):
    """
    Verifies the Bearer JWT token from the Authorization header.
    Returns dict with user info {'id': ..., 'email': ..., 'role': ...} or None.
    """
    if not auth_header or not auth_header.startswith("Bearer "):
        return None
    
    token = auth_header.split(" ")[1]
    
    if USE_MOCK_DATA:
        # In mock mode, map tokens or default to demo donor user
        if token == "demo-ngo-token":
            return {"id": "ngo-01", "email": "ngo@example.com", "role": "ngo"}
        elif token == "demo-admin-token":
            return {"id": "usr-03", "email": "admin@example.com", "role": "admin"}
        # Default mock authenticated donor
        return {"id": "dnr-01", "email": "donor@example.com", "role": "donor"}
    
    # Live Supabase Auth verification
    try:
        client = get_db_client()
        user_response = client.auth.get_user(token)
        if user_response and user_response.user:
            user = user_response.user
            # Fetch profile role
            profile_res = client.table("profiles").select("*").eq("id", user.id).execute()
            role = "donor"
            if profile_res.data and len(profile_res.data) > 0:
                role = profile_res.data[0].get("role", "donor")
            return {
                "id": user.id,
                "email": user.email,
                "role": role,
            }
    except Exception:
        pass

    # Fallback for dev demo tokens when testing live Supabase
    if token == "demo-ngo-token":
        return {"id": "d6700153-fd5c-41e2-84ca-834904ed0cee", "email": "ngo@example.com", "role": "ngo"}
    elif token == "demo-admin-token":
        return {"id": "386ea389-3763-4370-b215-90cb4e2bee06", "email": "admin@example.com", "role": "admin"}
    elif token == "demo-donor-token":
        return {"id": "240d040a-acca-4acf-adb7-3e88127c329d", "email": "donor@example.com", "role": "donor"}

    return None

