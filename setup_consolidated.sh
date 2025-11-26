#!/bin/bash
# Consolidated Supabase Setup Script
# Combines all necessary schema updates, data seeding, and configuration

echo "==========================================="
echo "Consolidated Supabase Setup Script"
echo "==========================================="
echo ""

# Function to check prerequisites
check_prerequisites() {
    echo "1. Checking prerequisites..."
    
    # Check if supabase CLI is installed
    if ! command -v supabase &> /dev/null; then
        echo "❌ Supabase CLI is not installed."
        echo "Installing Supabase CLI..."
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # Mac
            brew install supabase/tap/supabase
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            # Linux - Guide user to install
            echo "Please install Supabase CLI manually:"
            echo "For Ubuntu/Debian: Download from https://github.com/supabase/cli/releases"
            exit 1
        else
            echo "Please install Supabase CLI from: https://github.com/supabase/cli/releases"
            exit 1
        fi
    fi
    
    # Check if we're in the project root
    if [ ! -f "./package.json" ]; then
        echo "❌ Not in project root directory. Please run from the project root."
        exit 1
    fi
    
    echo "✅ Prerequisites met"
    echo ""
}

# Function to apply database schema
apply_schema() {
    echo "2. Applying database schema..."
    
    SCHEMA_FILE="scripts/consolidated_schema.sql"
    if [ ! -f "$SCHEMA_FILE" ]; then
        echo "❌ Schema file $SCHEMA_FILE not found!"
        exit 1
    fi
    
    echo "Schema file found. Contents:"
    echo "----------------------------------------"
    cat "$SCHEMA_FILE"
    echo "----------------------------------------"
    
    read -p "Apply schema changes? (yes/no): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Applying schema changes..."
        
        # Check if authenticated
        if ! supabase status &> /dev/null; then
            echo "❌ Not authenticated with Supabase."
            echo "Run: supabase login"
            echo "Then rerun this script."
            exit 1
        fi
        
        # Execute the SQL
        cat "$SCHEMA_FILE" | supabase db shell
        
        if [ $? -eq 0 ]; then
            echo "✅ Schema applied successfully!"
        else
            echo "❌ Schema application failed!"
            exit 1
        fi
    else
        echo "Schema application skipped."
    fi
    echo ""
}

# Function to setup sample data
setup_sample_data() {
    echo "3. Setting up sample data..."
    
    SAMPLE_DATA_SCRIPT="scripts/setupSampleData.js"
    if [ ! -f "$SAMPLE_DATA_SCRIPT" ]; then
        echo "❌ Sample data script $SAMPLE_DATA_SCRIPT not found!"
        echo "Skipping sample data setup."
        echo ""
        return
    fi
    
    read -p "Run sample data setup? (yes/no): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Running sample data setup..."
        npm run setup-sample-data
        if [ $? -eq 0 ]; then
            echo "✅ Sample data setup completed!"
        else
            echo "⚠️  Sample data setup may have failed - check output above."
        fi
    else
        echo "Sample data setup skipped."
    fi
    echo ""
}

# Function to setup users
setup_users() {
    echo "4. Setting up users..."
    
    USER_SETUP_SCRIPT="scripts/addSampleUsers.js"
    if [ ! -f "$USER_SETUP_SCRIPT" ]; then
        echo "❌ User setup script $USER_SETUP_SCRIPT not found!"
        echo "Skipping user setup."
        echo ""
        return
    fi
    
    read -p "Run user setup? (yes/no): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Running user setup..."
        node "$USER_SETUP_SCRIPT"
        if [ $? -eq 0 ]; then
            echo "✅ User setup completed!"
        else
            echo "⚠️  User setup may have failed - check output above."
        fi
    else
        echo "User setup skipped."
    fi
    echo ""
}

# Function to verify configuration
verify_config() {
    echo "5. Verifying configuration..."
    
    # Check .env.local
    if [ -f ".env.local" ]; then
        if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local && grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local; then
            echo "✅ Environment variables found in .env.local"
        else
            echo "⚠️  Missing Supabase environment variables in .env.local"
            echo "Make sure you have:"
            echo "NEXT_PUBLIC_SUPABASE_URL="
            echo "NEXT_PUBLIC_SUPABASE_ANON_KEY="
        fi
    else
        echo "⚠️  .env.local file not found"
        echo "Make sure you have Supabase configuration in your environment"
    fi
    
    echo "✅ Configuration verification complete"
    echo ""
}

# Function to start the application
start_app() {
    echo "6. Starting the application..."
    
    read -p "Start Next.js development server? (yes/no): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Starting development server..."
        npm run dev
    else
        echo "Application start skipped."
    fi
    echo ""
}

# Main execution
main() {
    check_prerequisites
    
    echo "Choose setup options:"
    echo "1) Complete setup (schema + data + users + config + start)"
    echo "2) Schema only"
    echo "3) Data and users only"
    echo "4) Configuration and start only"
    echo "5) Custom selection"
    echo ""
    read -p "Enter choice (1-5): " choice
    
    case $choice in
        1)
            echo "Running complete setup..."
            apply_schema
            setup_sample_data
            setup_users
            verify_config
            start_app
            ;;
        2)
            echo "Running schema setup only..."
            apply_schema
            ;;
        3)
            echo "Running data and users setup only..."
            setup_sample_data
            setup_users
            ;;
        4)
            echo "Running configuration and start only..."
            verify_config
            start_app
            ;;
        5)
            echo "Custom setup selected:"
            read -p "Apply schema? (y/n): " schema_choice
            read -p "Setup sample data? (y/n): " data_choice
            read -p "Setup users? (y/n): " user_choice
            read -p "Verify config? (y/n): " config_choice
            read -p "Start app? (y/n): " app_choice
            
            [[ $schema_choice =~ ^[Yy]$ ]] && apply_schema
            [[ $data_choice =~ ^[Yy]$ ]] && setup_sample_data
            [[ $user_choice =~ ^[Yy]$ ]] && setup_users
            [[ $config_choice =~ ^[Yy]$ ]] && verify_config
            [[ $app_choice =~ ^[Yy]$ ]] && start_app
            ;;
        *)
            echo "Invalid choice. Exiting."
            exit 1
            ;;
    esac
    
    echo "==========================================="
    echo "Setup complete!"
    echo "==========================================="
}

# Run the main function
main "$@"