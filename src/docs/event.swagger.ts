export const eventSwaggerDoc = {
    '/events/initialize': {
      post: {
        summary: 'Initialize a new event with tickets',
        tags: ['Events'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Name of the event',
                  },
                  totalTickets: {
                    type: 'integer',
                    description: 'Total number of tickets available for the event',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Event successfully created',
          },
          400: {
            description: 'Validation failed',
          },
        },
      },
    },
    '/events/status/{eventId}': {
      get: {
        summary: 'Get the status of an event',
        tags: ['Events'],
        parameters: [
          {
            name: 'eventId',
            in: 'path',
            required: true,
            description: 'The ID of the event',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Event status retrieved successfully',
          },
          404: {
            description: 'Event not found',
          },
        },
      },
    },
  };
  