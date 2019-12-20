import reducer from "./authReducer";
import * as actionTypes from "../actions/actionsTypes";

describe("authReducer", () => {
  it("When authReducer initialized state is initialized ", () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      token: null,
      userId: null,
      error: null,
      authRedirectPath: "/"
    });
  });

  it("should set the token and userId upon login", () => {
    expect(
      reducer(
        {
          loading: false,
          token: null,
          userId: null,
          error: null,
          authRedirectPath: "/"
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          userId:'some-user-id',
          token:'some-token'
        }
      )
    ).toEqual(
        {
            loading: false,
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            authRedirectPath: "/"
          }
    );
  });
});
