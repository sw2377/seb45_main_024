import { getTokensFromLocalStorage } from "./tokenStorage";

interface AccessTokenType {
  id: number;
  imageUrl: string;
}

export const getTokenInfo = () => {
  const token = getTokensFromLocalStorage() as AccessTokenType;

  let tokenId: number;
  let userProfileImage: string;

  if (token) {
    tokenId = token.id;
    userProfileImage = token.imageUrl;

    return { tokenId, userProfileImage };
  }
};
