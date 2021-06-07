#!/usr/bin/env bash
set -Eeo pipefail
sed -i "s|__API_URL__|${API_URL}|"  environments/index.html
exec "$@"
