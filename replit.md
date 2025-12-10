# Roblox Username Checker API

## Overview
A Node.js Express server that checks Roblox username availability with profanity filtering and cool username generation.

## Project Structure
- `index.js` - Express server with API endpoints
- `package.json` - Project configuration with dependencies

## Dependencies
- **express** - Web server framework
- **axios** - HTTP client for API requests
- **googleapis** - Google APIs client library

## API Endpoints

### GET /
Health check endpoint. Returns server status.

### GET /api
Main API endpoint with query parameters:
- `?cool=true` - Generate a cool, available username
- `?word=true` - Check a random word for availability
- `?username=xyz` - Check if a specific username is available (returns "AVAILABLE" or "TAKEN")

## Environment Variables
- `ROBLOX_SECURITY_TOKEN` - (Optional) Roblox security token for authenticated API calls

## Usage
The server runs on port 5000. Access the API at:
```
http://localhost:5000/api?username=testname
http://localhost:5000/api?cool=true
http://localhost:5000/api?word=true
```

## Recent Changes
- December 10, 2025: Converted from Google Apps Script to Node.js Express server
- Added express and axios dependencies
- Replaced UrlFetchApp with axios for HTTP requests
- Replaced ContentService with Express response methods
- Server now listens on port 5000
