# n8n-nodes-basevn-goal

This is an n8n community node for BaseVN Goal API integration (OKR & KPI management).

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Cycle (7 operations)
- Get summary info, checkins, KRs, reviews, detail of cycle
- List all cycles
- Create new cycle

### Target (8 operations)
- Get detail and summary of target
- Create company/dept/team OKR targets
- Create company/dept/team KPI targets

### Goal (4 operations)
- Get detail and summary of goal
- Create OKR/KPI goals

### Key Result (2 operations)
- Get detail of KR
- Create new KR

### Checkin (2 operations)
- Checkin to KPI goal
- Checkin to KR

## Credentials

Configure the following credentials:
- **Domain**: Your BaseVN domain (e.g., `company.base.vn`)
- **Access Token**: Your Goal API access token

## Compatibility

Tested with n8n version 1.0+

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [BaseVN Goal API Documentation](https://goal.base.vn)

## License

[MIT](LICENSE.md)
