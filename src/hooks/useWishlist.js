import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

function useWishlist() {
    return useContext(WishlistContext);
}

export default useWishlist;