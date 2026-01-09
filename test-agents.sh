#!/bin/bash

API_KEY="blacksync_internal_9f3k2kD9aS83lK"
CLIENT_ID="0ef16dbb-9b30-43ea-a7d3-38bdaefce9ae"


BASE_URL="http://localhost:3000"

echo "➡️ Creating agent..."
CREATE_RESPONSE=$(curl -s -X POST "$BASE_URL/api/agents/create" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d "{\"client_id\":\"$CLIENT_ID\",\"name\":\"Test Agent Script\"}")

echo "$CREATE_RESPONSE"

AGENT_ID=$(echo $CREATE_RESPONSE | jq -r '.agent.id')

echo "➡️ Listing agents..."
curl -s -X GET "$BASE_URL/api/agents/list?client_id=$CLIENT_ID" \
  -H "x-api-key: $API_KEY"

echo ""
echo "➡️ Updating agent..."
curl -s -X PUT "$BASE_URL/api/agents/update" \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d "{\"id\":\"$AGENT_ID\",\"status\":\"active\"}"

echo ""
echo "➡️ Deleting agent..."
curl -s -X DELETE "$BASE_URL/api/agents/delete?id=$AGENT_ID" \
  -H "x-api-key: $API_KEY"

echo ""
echo "✅ CRUD test completed"

