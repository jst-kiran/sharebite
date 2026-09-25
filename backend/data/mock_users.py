"""
Temporary in-memory "database" of users, used only so the placeholder
auth endpoints have something to check against. This resets every time
the server restarts and should be replaced by a real database later.
"""

users = [
    {
        "id": 1,
        "name": "Green Plate Restaurant",
        "email": "donor@example.com",
        "password": "password123",  # NOTE: plain text for demo only, never do this in production
        "role": "donor",
    },
    {
        "id": 2,
        "name": "Helping Hands Foundation",
        "email": "ngo@example.com",
        "password": "password123",
        "role": "ngo",
    },
]


def find_user_by_email(email):
    return next((u for u in users if u["email"].lower() == email.lower()), None)


def add_user(name, email, password, role):
    new_user = {
        "id": len(users) + 1,
        "name": name,
        "email": email,
        "password": password,
        "role": role,
    }
    users.append(new_user)
    return new_user
