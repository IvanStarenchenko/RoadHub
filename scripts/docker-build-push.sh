#!/usr/bin/env bash
set -euo pipefail

IMAGE_REPOSITORY="${IMAGE_REPOSITORY:-tymurmustafaiev/roadhub-frontend}"
IMAGE_TAG="${IMAGE_TAG:-latest}"
PLATFORMS="${PLATFORMS:-linux/amd64}"

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${PROJECT_ROOT}"

if [[ -f .env ]]; then
  set -a
  # Support .env files with CRLF line endings.
  # shellcheck disable=SC1090
  . <(sed 's/\r$//' ./.env)
  set +a
fi

: "${NEXT_PUBLIC_TMDB_TOKEN:?NEXT_PUBLIC_TMDB_TOKEN is required}"
: "${NEXT_PUBLIC_RAWG_API:?NEXT_PUBLIC_RAWG_API is required}"

IMAGE_REF="${IMAGE_REPOSITORY}:${IMAGE_TAG}"

echo "Building and pushing ${IMAGE_REF} from ${PROJECT_ROOT}"

docker buildx build \
  --platform "${PLATFORMS}" \
  --build-arg NEXT_PUBLIC_TMDB_TOKEN="${NEXT_PUBLIC_TMDB_TOKEN}" \
  --build-arg NEXT_PUBLIC_RAWG_API="${NEXT_PUBLIC_RAWG_API}" \
  --tag "${IMAGE_REF}" \
  --push \
  .

echo "Image published: ${IMAGE_REF}"
echo "Server update command: docker compose pull && docker compose up -d"
