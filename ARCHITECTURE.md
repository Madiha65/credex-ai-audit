
---

# ARCHITECTURE.md

Isme system design explain karna hai.

Example:

```md id="z8l0y2"
# Architecture

```mermaid
graph TD

A[User Form] --> B[Audit API]
B --> C[Audit Engine]
C --> D[Pricing Data]
C --> E[AI Summary]
E --> F[Anthropic API]
B --> G[Supabase]
B --> H[Frontend Results]