import type { APIRequestContext } from "@playwright/test";

export interface ChangePromotionRequest {
    simSerialNo: string;
    newPlanCode: string;
}

export interface ChangePromotionResponse {
    success: boolean;
    simSerialNo: string;
    planCode: string;
}

// The change-promotion API isn't implemented yet. This stub keeps the same
// signature/return shape the real endpoint will have so tests don't need to
// change — swap the body for `await api.post(...)` once it exists.
export async function changePromotion(
    _api: APIRequestContext,
    payload: ChangePromotionRequest,
): Promise<ChangePromotionResponse> {
    return {
        success: true,
        simSerialNo: payload.simSerialNo,
        planCode: payload.newPlanCode,
    };
}
