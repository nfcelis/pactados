# Stitch reference

This project uses the Stitch MCP server through the user-level Codex config at `~/.codex/config.toml`.

## Stitch project

- Project ID: `16587430836768263937`
- Screen: `Pactados Modern Landing Page`
- Active implementation screen ID: `e3ceb91cf0fd49e5840d2a5d6f239d35`
- Downloaded screenshot: `docs/stitch-screen-e3ceb91cf0fd49e5840d2a5d6f239d35.png`

## Notes

- The Stitch MCP server is installed globally for this machine, so both Codex CLI and supported editor sessions can reuse it.
- The active Codex session may need to be restarted before new MCP servers appear in the available tools.
- If Stitch returns hosted asset URLs, download them with `curl -L "<url>" -o "<filename>"`.
- The current landing implementation should track the downloaded Stitch screenshot first, then adapt details to the existing Next.js routes and real challenge data.
