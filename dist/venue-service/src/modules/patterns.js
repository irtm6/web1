"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patterns = void 0;
exports.patterns = {
    VENUE: {
        CREATE: { cmd: 'create_venue' }, // Створення майданчика
        GET_ALL: { cmd: 'get_all_venues' }, // Отримання всіх майданчиків
        GET_SLOTS: { cmd: 'get_venue_slots' }, // Отримання слотів для конкретного майданчика
        CREATE_SLOT: { cmd: 'create_venue_slot' }, // Створення слоту для майданчика
        UPDATE_SLOT: { cmd: 'update_venue_slot' },
        DELETE_SLOT: { cmd: 'delete_venue_slot' },
    },
};
