
set -e # Exit early if any commands fail


exec bun run app/main.ts "$@"
