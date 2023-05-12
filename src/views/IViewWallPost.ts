export interface IViewWallPost {
    id: number; // идентификатор записи на стене
    from_id: number; // идентификатор пользователя или сообщества, который опубликовал запись
    likes: {
        count: number;
    }; // количество лайков на записи
}