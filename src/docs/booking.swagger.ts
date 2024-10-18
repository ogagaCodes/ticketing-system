export const bookingSwaggerDoc = {
    '/bookings/book': {
      post: {
        summary: 'Book a ticket for an event',
        tags: ['Bookings'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  eventId: {
                    type: 'string',
                    description: 'The ID of the event to book',
                  },
                  userId: {
                    type: 'string',
                    description: 'The ID of the user booking the ticket',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Ticket booked successfully',
          },
          400: {
            description: 'Validation failed',
          },
        },
      },
    },
    '/bookings/cancel': {
      post: {
        summary: 'Cancel a ticket booking',
        tags: ['Bookings'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  eventId: {
                    type: 'string',
                    description: 'The ID of the event',
                  },
                  userId: {
                    type: 'string',
                    description: 'The ID of the user whose booking is to be cancelled',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Booking cancelled successfully',
          },
          400: {
            description: 'Validation failed',
          },
        },
      },
    },
  };
  