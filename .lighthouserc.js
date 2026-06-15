module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: [
        "http://localhost:3000/",
        "http://localhost:3000/dashboard",
        "http://localhost:3000/sign-in",
        "http://localhost:3000/theme",
        "http://localhost:3000/rendering",
        "http://localhost:3000/rendering/client",
        "http://localhost:3000/rendering/static",
        "http://localhost:3000/rendering/dynamic",
        "http://localhost:3000/rendering/isr",
        "http://localhost:3000/rendering/streaming",
      ],
      startServerCommand: "npm run build && npm run start",
      startServerReadyPattern: "Ready",
      startServerReadyTimeout: 120000,
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
      },
    },
  },
};
