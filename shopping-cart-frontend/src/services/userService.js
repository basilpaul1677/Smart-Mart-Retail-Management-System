import apiClient from "./apiClient";


const userService = {


    /*
     * ============================================================
     * GET MY PROFILE
     * ============================================================
     */

    getMyProfile: async () => {

        const response =
            await apiClient.get(
                "/users/me"
            );

        return response.data;

    },


    /*
     * ============================================================
     * UPDATE MY PROFILE
     * ============================================================
     */

    updateMyProfile: async (
        profileData
    ) => {

        const response =
            await apiClient.put(
                "/users/me",
                profileData
            );

        return response.data;

    },


    /*
     * ============================================================
     * CHANGE PASSWORD
     * ============================================================
     */

    changeMyPassword: async (
        passwordData
    ) => {

        await apiClient.put(
            "/users/me/password",
            passwordData
        );

    }

};


export default userService;