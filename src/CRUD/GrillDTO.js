export default class GrillDTO {
    constructor(data) {
        this.id = data.id;
        this.amenity = data.amenity;
        this.cuisine = data.cuisine;
        this.lat = data.lat;
        this.lon = data.lon;
        this.tags = data.tags;
    }
}


