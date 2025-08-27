#!/bin/bash

# EnDanceStudio Backup Script
# This script creates a timestamped backup of the entire project

# Get the current date and time
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Define paths
CURRENT_DIR="$(pwd)"
PROJECT_NAME="EnDanceStudio"
BACKUP_NAME="${PROJECT_NAME}_backup_${TIMESTAMP}"
PARENT_DIR="$(dirname "$CURRENT_DIR")"
BACKUP_PATH="${PARENT_DIR}/${BACKUP_NAME}"

echo "=== EnDanceStudio Backup Script ==="
echo "Creating backup: ${BACKUP_NAME}"
echo "Source: ${CURRENT_DIR}"
echo "Destination: ${BACKUP_PATH}"
echo ""

# Create backup using rsync (excludes node_modules and other unnecessary files)
echo "Starting backup process..."
rsync -av --progress \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='dist' \
    --exclude='.git' \
    --exclude='*.log' \
    --exclude='.DS_Store' \
    --exclude='._*' \
    "${CURRENT_DIR}/" "${BACKUP_PATH}/"

# Check if backup was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Backup completed successfully!"
    echo "Backup location: ${BACKUP_PATH}"
    
    # Show backup size
    BACKUP_SIZE=$(du -sh "${BACKUP_PATH}" | cut -f1)
    echo "Backup size: ${BACKUP_SIZE}"
else
    echo ""
    echo "❌ Backup failed!"
    exit 1
fi

echo ""
echo "=== Backup Complete ==="