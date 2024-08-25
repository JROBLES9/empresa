jest.mock('./src/db/db', () => ({
  __esModule: true,
  default: {
    authenticate: jest.fn(),
    sync: jest.fn(),
  },
}));

jest.mock('sequelize', () => {
    const actualSequelize = jest.requireActual('sequelize');
    return {
      ...actualSequelize,
      Model: class MockModel {
        static init = jest.fn();
        static define = jest.fn();
      },
      DataTypes: actualSequelize.DataTypes,
    };
  });