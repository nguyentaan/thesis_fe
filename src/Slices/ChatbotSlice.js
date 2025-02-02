import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PYTHON_API = `${process.env.REACT_APP_PYTHON_URL}`;
console.log("PYTHON_API", PYTHON_API);
export const fetchChatbot = createAsyncThunk(
  "chatbot/fetchResponse",
  async (userQuery, { rejectWithValue }) => {
    try {
      // Make the POST request with the query
      const response = await axios.post(`${PYTHON_API}/search`, {
        query: userQuery, // Ensure the query is in the required format
      });
      console.log("Chatbot response:", response.data);

      return { userQuery, botResponse: response.data }; // Return both the query and bot response
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const chatbotSlice = createSlice({
  name: "chatbot",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatbot.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChatbot.fulfilled, (state, action) => {
        console.log("Action Payload:", action.payload); // Log to inspect the structure

        // Add the bot's response after the user query
        state.messages.push({
          sender: "bot",
          text: action.payload.botResponse?.answer || "No response received.",
        });
        state.loading = false;
      })
      .addCase(fetchChatbot.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { addMessage } = chatbotSlice.actions;
export default chatbotSlice.reducer;
