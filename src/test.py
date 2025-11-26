import os
from supabase import create_client, Client

# Load environment variables from .env.local
from dotenv import load_dotenv
load_dotenv('.env.local')

url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")

if not url or not key:
    raise ValueError("Supabase URL and Anon Key are required.")

# Create Supabase client
supabase: Client = create_client(url, key)

def test_connection():
    """
    Tests the connection to Supabase by fetching data from a table.
    """
    try:
        # Fetch data from the 'products' table
        response = supabase.table('products').select("*").limit(1).execute()
        
        # Check if the response contains data
        if response.data:
            print("Successfully connected to Supabase and fetched data.")
            print("Test product:", response.data[0])
        else:
            print("Connected to Supabase, but no data found in 'products' table.")
            
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    test_connection()
