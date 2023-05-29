import React from 'react';
import { renderHook } from '@testing-library/react';
import useSaveDriver from '../../../src/hooks/driver/useSaveDriver';
import api from '../../../src/services/api';
import { useLocation } from 'react-router-dom';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
}));

jest.mock("../../../src/services/api", () => ({
    post: jest.fn(),
    patch: jest.fn(),
}));

const mockSetState = jest.fn();
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: (initial: any) => [initial, mockSetState]
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        state: {
            driver: {
                id: 1,
                name: "John",
                document: "123",
                vehicle: {
                    plate: "ABC123",
                    model: "Sedan",
                },
            }
        }
    })
}));

describe('useSaveDriver', () => {

    test('should call postDriver function when driver and params id are not provided', async () => {
        const postDriverMock = jest.spyOn(api, "post");
        const { result } = renderHook(() => useSaveDriver());
        const { handleSubmit } = result.current;
        const submit = { document: "02744628428", model: "Argo", plate: "XYZ-123", name: "Joao" }
        await handleSubmit(submit);
        expect(postDriverMock).toHaveBeenCalledTimes(1);
        expect(postDriverMock).toHaveBeenCalledWith("/driver", submit);
    });

    test.only("should call updateDriver function when driver and params id are provided", async () => {
        const updateDriverMock = jest.spyOn(api, "patch");
        const { result } = renderHook(() => useSaveDriver());
        const submitUpdate = { id: 1, name: "Joao", document: "4762729394982", model: "Pulse", plate: "XWG 2123" };
        const { handleSubmit } = result.current;
        await handleSubmit(submitUpdate);
        expect(updateDriverMock).toHaveBeenCalledTimes(1);
        expect(updateDriverMock).toHaveBeenCalledWith(`/driver/${submitUpdate.id}`, {
            name: submitUpdate.name,
            document: submitUpdate.document,
        });
    });
});