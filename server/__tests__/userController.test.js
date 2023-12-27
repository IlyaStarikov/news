const { User } = require('../models');
const userController = require('../controllers/userController');
const { user } = require('../mocks');

const statusMockFn = jest.fn();
const sendMockFn = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

describe('UserController tests', () => {
  test('should find user with id "1" and return status 200 with data', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(user);

    const mockedRequest = { params: { id: 1 } };
    const mockedResponse = {
      status: statusMockFn.mockReturnValueOnce({ send: sendMockFn }),
    };

    await userController.getOneUser(mockedRequest, mockedResponse);

    expect(statusMockFn).toHaveBeenCalledWith(200);
    expect(sendMockFn).toHaveBeenCalledWith(user);
  });

  test('should return status 500 and message "User not found" if user not found', async () => {
    jest.spyOn(User, 'findOne').mockRejectedValue('User not found');

    const mockedRequest = { params: { id: 1 } };
    const mockedResponse = {
      status: statusMockFn.mockReturnValueOnce({ send: sendMockFn }),
    };

    await userController.getOneUser(mockedRequest, mockedResponse);

    expect(statusMockFn).toHaveBeenCalledWith(500);
    expect(sendMockFn).toHaveBeenCalledWith('User not found');
  });
});
