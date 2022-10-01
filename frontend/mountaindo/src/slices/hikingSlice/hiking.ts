import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosService from '../../store/axiosService';

// 등산 기록 저장
export const endHiking = createAsyncThunk(
  'userSlice/endHiking',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.post('/api/v1/hikings', {
        trailId: args.trailId,
        path: args.path,
        endPoint: args.endPoint,
        accumulatedHeight: args.accumulatedHeight,
        distance: args.distance,
        useTime: args.useTime,
        imageUrl: args.imageUrl,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 산 검색
export const searchMountain = createAsyncThunk(
  'userSlice/searchMountain',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get(
        `/api/v1/mountains/search/2?keyword=${args.keyword}`,
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 산 상세 조회
export const mountainDetail = createAsyncThunk(
  'userSlice/mountainDetail',
  async (args: any, {rejectWithValue}) => {
    try {
      const response = await axiosService.get(
        `/api/v1/mountains/${args.mountainId}`,
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

const hikingSlice = createSlice({
  name: 'hiking',
  initialState: {},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(endHiking.fulfilled, (state, {payload}) => {
        console.log('endHiking Fulfilled ==> ', payload);
      })
      .addCase(endHiking.rejected, (state, {payload}) => {
        console.log('endHiking Rejected ==>', payload);
      })
      .addCase(searchMountain.fulfilled, (state, {payload}) => {
        console.log('searchMountain Fulfilled ==> ', payload);
      })
      .addCase(searchMountain.rejected, (state, {payload}) => {
        console.log('searchMountain Rejected ==>', payload);
      })
      .addCase(mountainDetail.fulfilled, (state, {payload}) => {
        console.log('mountainDetail Fulfilled ==> ', payload);
      })
      .addCase(mountainDetail.rejected, (state, {payload}) => {
        console.log('mountainDetail Rejected ==>', payload);
      });
  },
});

export default hikingSlice;
