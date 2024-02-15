import { GuildScheduledEvent } from "discord.js";
import ScheduledGuildEvent from "../../models/ScheduledGuildEvent";
import { SystemEvents, systemEventEmitter } from "../../utils/event-emitter";

export default async function (
    _oldGuildEvent: GuildScheduledEvent,
    newGuildEvent: GuildScheduledEvent,
) {
    await ScheduledGuildEvent.findOneAndUpdate(
        { eventId: newGuildEvent.id },
        {
            name: newGuildEvent.name,
            scheduledStartsAt: new Date(newGuildEvent.scheduledStartTimestamp!),
        },
    );

    systemEventEmitter.emit(SystemEvents.GuildEventUpdated, {
        eventId: newGuildEvent.id,
        eventName: newGuildEvent.name,
        creatorId: newGuildEvent.creatorId,
        isUpdatedEvent: true,
    });
}
