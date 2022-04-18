import {
  APP_STATE,
  CONNECTION_FAILED,
  UPDATE_ACCOUNT,
  UPDATE_LISTS,
  UPDATE_MYLISTS,
  CALL_CONTRACT,
  UPDATE_MYBALANCE,
  MY_MODAL,
} from "../actions";

const initialState = {
  network: false,
  wallet: false,
  account: null,
  Owner: null,
  isUser: false,
  CreateNFTContract: null,
  AmusementArcadeTokenContract: null,
  TokenClaimContract: null,
  Selllists: [],
  MyNFTlists: null,
  Mybalance: 0,
  MyModal: false,
  errorMsg: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case APP_STATE:
      return {
        ...state,
        network: action.payload.network,
        Owner: action.payload.Owner,
        Selllists: action.payload.Selllists,
        errorMsg: action.payload.errorMsg,
      };
    case CONNECTION_FAILED:
      return {
        ...initialState,
        errorMsg: action.payload.errorMsg,
      };
    case CALL_CONTRACT:
      return {
        ...state,
        CreateNFTContract: action.payload.CreateNFTContract,
        AmusementArcadeTokenContract:
          action.payload.AmusementArcadeTokenContract,
        TokenClaimContract: action.payload.TokenClaimContract,
      };
    case UPDATE_ACCOUNT:
      return {
        ...state,
        wallet: action.payload.wallet,
        account: action.payload.account,
        isUser: action.payload.isUser,
        MyNFTlists: action.payload.MyNFTlists,
        Mybalance: action.payload.Mybalance,
      };
    case UPDATE_LISTS:
      return {
        ...state,
        Selllists: action.payload.Selllists,
      };
    case UPDATE_MYLISTS:
      return {
        ...state,
        MyNFTlists: action.payload.MyNFTlists,
      };
    case UPDATE_MYBALANCE:
      return {
        ...state,
        Mybalance: action.payload.Mybalance,
      };
    case MY_MODAL:
      return {
        ...state,
        MyModal: action.payload.MyModal,
      };
    default:
      return state;
  }
}
