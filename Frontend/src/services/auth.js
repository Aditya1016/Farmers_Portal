import axios from 'axios';
export const getCurrentUser = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/profile`,{
            withCredentials: true
        })

        if (response.status === 200) {
            return response.data;
        }
        else{ 
            return null;
        }
        
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
}

export const loginUser = async (data) => {
    try {
        const { email, password } = data;
        console.log("Login data:", data);
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
    
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/sign-in`, {
          email,
          password
        },{
          withCredentials: true
        })
    
        if (response.status === 201) {
            console.log("Login successful:", response.data);
            return response;
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        return null;
    }
}

export const createUser = async (data) => {
    try {
        const { name, email, password } = data;
        if (!name || !email || !password) {
            throw new Error('Name, email, and password are required');
        }
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/sign-up`,
          {
            name,
            email,
            password,
          },
          {
            withCredentials: true,
          }
        );
    
        return response;
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
}

export const logoutUser = async () => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/sign-out`,
            {},
            { withCredentials: true }
        );

        return response;
    } catch (error) {
        console.error("Error logging out user:", error);
        return null;
    }
}

export const createMerchant = async (data) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/merchants/sign-up`,
            data,
            {
                withCredentials: true,
            }
        );

        return response;
    } catch (error) {
        console.error("Error creating merchant:", error);
        return null;
    }
}

export const loginMerchant = async (data) => {
    try {
        const { email, password } = data;
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/merchants/sign-in`,
            { email, password },
            { withCredentials: true }
        );

        return response;
    } catch (error) {
        console.error("Error logging in merchant:", error);
        return null;
    }
}

export const logoutMerchant = async () => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/merchants/sign-out`,
            {},
            { withCredentials: true }
        );

        return response;
    } catch (error) {
        console.error("Error logging out merchant:", error);
        return null;
    }
}
