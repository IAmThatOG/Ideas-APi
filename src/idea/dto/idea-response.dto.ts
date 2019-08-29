export class IdeaResponseDto {

    constructor(public id: string,
        public idea: string,
        public description: string,
        public createdAt: Date,
        public updatedAt: Date) { }
}
