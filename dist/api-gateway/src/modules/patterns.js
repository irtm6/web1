"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patterns = void 0;
exports.patterns = {
    USER: {
        CREATE: { cmd: 'create_user' },
        LOGIN: { cmd: 'login_user' },
        FIND_ALL: { cmd: 'find_all_users' },
        FIND_BY_ID: { cmd: 'find_user_by_id' },
        UPDATE: { cmd: 'update_user' },
        DELETE: { cmd: 'delete_user' },
        FIND_BY_EMAIL: { cmd: 'find_user_by_email' },
        RESET_PASSWORD: { cmd: 'reset_password' },
    },
    VENUE: {
        CREATE: { cmd: 'create_venue' }, // Створення майданчика
        GET_ALL: { cmd: 'get_all_venues' }, // Отримання всіх майданчиків
        GET_SLOTS: { cmd: 'get_venue_slots' }, // Отримання слотів для конкретного майданчика
        CREATE_SLOT: { cmd: 'create_venue_slot' }, // Створення слоту для майданчика
        UPDATE_SLOT: { cmd: 'update_venue_slot' },
        DELETE_SLOT: { cmd: 'delete_venue_slot' },
    },
};
