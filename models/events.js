const db = require("../database/connect");

class Event {
    constructor({
        event_id,
        user_id,
        event_title,
        event_description,
        interest,
        attending,
        category_id,
        start_date,
        end_date,
        location,
        image_url,
    }) {
        (this.id = event_id),
            (this.user_id = user_id),
            (this.title = event_title),
            (this.description = event_description),
            (this.interest = interest),
            (this.attending = attending),
            (this.category_id = category_id),
            (this.start_date = start_date),
            (this.end_date = end_date);
        this.location = location;
        this.image_url = image_url;
    }

    static async getAll() {
        const response = await db.query(
            "SELECT * FROM events ORDER BY interest DESC, attending DESC;"
        );
        return response.rows.map((g) => new Event(g));
    }

    static async getUserEvents(user) {
        const response = await db.query(
            "SELECT * FROM events WHERE user_id = $1 ORDER BY interest DESC, attending DESC;",
            [user.id]
        );
        return response.rows.map((g) => new Event(g));
    }

    static async getOneById(id) {
        const response = await db.query(
            "SELECT * FROM events WHERE event_id = $1",
            [id]
        );
        if (response.rows.length != 1) {
            throw new Error("Unable to locate event.");
        }
        return new Event(response.rows[0]);
    }

    static async search(string) {
        const response = await db.query(
            "SELECT * FROM events WHERE event_title ILIKE '%' || $1 || '%' OR event_description ILIKE '%' || $1 || '%';",
            [string]
        );
        return response.rows.map((g) => new Event(g));
    }

    static async create(data) {
        const {
            event_title,
            user_id,
            event_description,
            category_id,
            start_date,
            end_date,
            location,
            image_url,
        } = data;
        const response = await db.query(
            "INSERT INTO events (event_title, user_id, event_description, category_id, start_date, end_date, location, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;",
            [
                event_title,
                user_id,
                event_description,
                category_id,
                start_date,
                end_date,
                location,
                image_url,
            ]
        );

        return new Event(response.rows[0]);
    }

    async interested() {
        const response = await db.query(
            "UPDATE events SET interest = $1 WHERE event_id = $2 RETURNING event_id, interest;",
            [this.interest + 1, this.id]
        );
        if (response.rows.length != 1) {
            throw new Error("Unable to update interest.");
        }
        return new Event(response.rows[0]);
    }

    async not_interested() {
        const response = await db.query(
            "UPDATE events SET interest = $1 WHERE event_id = $2 RETURNING event_id, interest;",
            [this.interest - 1, this.id]
        );
        if (response.rows.length != 1) {
            throw new Error("Unable to update interest.");
        }
        return new Event(response.rows[0]);
    }

    async attend() {
        const response = await db.query(
            "UPDATE events SET attending = $1 WHERE event_id = $2 RETURNING event_id, attending;",
            [this.attending + 1, this.id]
        );
        if (response.rows.length != 1) {
            throw new Error("Unable to update interest.");
        }
        return new Event(response.rows[0]);
    }

    async not_attending() {
        const response = await db.query(
            "UPDATE events SET attending = $1 WHERE event_id = $2 RETURNING event_id, attending;",
            [this.attending - 1, this.id]
        );
        if (response.rows.length != 1) {
            throw new Error("Unable to update interest.");
        }
        return new Event(response.rows[0]);
    }

    async destroy() {
        let response = await db.query(
            "DELETE FROM events WHERE event_id = $1 RETURNING *;",
            [this.id]
        );

        return new Event(response.rows[0]);
    }
}

module.exports = Event;
