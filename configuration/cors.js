const corsOptions = {
  origin: ['http://localhost:3000',
    'http://localhost:3001',
    'https://movies.biver.nomoredomains.rocks/',
  ],
  optionsSuccessStatus: 200,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'origin'],
  credentials: true,
  preflightContinue: false,
};

module.exports = corsOptions;
