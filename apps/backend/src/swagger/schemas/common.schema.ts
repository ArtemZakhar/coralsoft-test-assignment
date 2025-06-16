export const commonSchema = {
  Error: {
    type: 'object',
    required: ['code', 'message'],
    properties: {
      code: {
        type: 'number',
      },
      message: {
        type: 'string',
      },
    },
  },
  ErrorWithDetails: {
    type: 'object',
    required: ['code', 'message'],
    properties: {
      code: {
        type: 'number',
      },
      message: {
        type: 'string',
      },
      details: {
        oneOf: [
          {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                location: {
                  type: 'string',
                },
                msg: {
                  type: 'string',
                },
                param: {
                  type: 'string',
                },
                path: {
                  type: 'string',
                },
                value: {
                  type: 'string',
                },
              },
            },
          },
          {
            type: 'string',
          },
        ],
      },
    },
  },
};
