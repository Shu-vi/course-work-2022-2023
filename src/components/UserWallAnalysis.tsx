import React, {FC, useMemo} from 'react';
import {IViewWallPost} from "../views/IViewWallPost";
import {IViewUser} from "../views/IViewUser";

interface Props {
    user: IViewUser;
}

export const UserWallAnalysis: FC<Props> = ({user}) => {
    const posts = useMemo(() => {
        // Фильтруем записи, которые пользователь добавил сам
        const userPosts = user.posts.filter((post: IViewWallPost) => post.from_id === user.id);

        // Фильтруем записи, которые пользователь добавил от другого пользователя или группы
        const othersPosts = user.posts.filter((post: IViewWallPost) => post.from_id !== user.id);

        return {
            userPosts,
            othersPosts,
        };
    }, [user.posts, user.id]);

    const userPostsLikes = useMemo(() => {
        // Получаем массив лайков на записи, которые пользователь добавил сам
        return posts.userPosts.map(post => post.likes.count);
    }, [posts.userPosts]);

    const othersPostsLikes = useMemo(() => {
        // Получаем массив лайков на записи, которые пользователь добавил от другого пользователя или группы
        return posts.othersPosts.map(post => post.likes.count);
    }, [posts.othersPosts]);

    const userPostsLikesSum = useMemo(() => {
        // Суммируем количество лайков на записи, которые пользователь добавил сам
        return userPostsLikes.reduce((sum, likesCount) => sum + likesCount, 0);
    }, [userPostsLikes]);

    const othersPostsLikesSum = useMemo(() => {
        // Суммируем количество лайков на записи, которые пользователь добавил от другого пользователя или группы
        return othersPostsLikes.reduce((sum, likesCount) => sum + likesCount, 0);
    }, [othersPostsLikes]);

    const userPostsLikesAvg = useMemo(() => {
        // Считаем среднее количество лайков на запись, которые пользователь добавил сам
        if (posts.userPosts.length === 0) {
            return 0;
        }
        return userPostsLikesSum / posts.userPosts.length;
    }, [userPostsLikesSum, posts.userPosts.length]);

    const othersPostsLikesAvg = useMemo(() => {
        // Считаем среднее количество лайков на запись, которые пользователь добавил от другого пользователя или группы
        if (posts.othersPosts.length === 0) {
            return 0;
        }
        return othersPostsLikesSum / posts.othersPosts.length;
    }, [othersPostsLikesSum, posts.othersPosts.length]);

    if (user.posts.length === 0) {
        return <div>У пользователя {user.first_name} {user.last_name} нет постов на стене для того, чтобы их
            проанализировать</div>
    }

    return (
        <div>
            <div>{`Количество постов, которые пользователь добавил сам: ${posts.userPosts.length}`}</div>
            <div>{`Количество постов, которые пользователь добавил от другого пользователя или группы: ${posts.othersPosts.length}`}</div>
            {
                posts.userPosts.length > 0 && (
                    <div>{`Среднее количество лайков на посты, которые пользователь добавил сам: ${userPostsLikesAvg}`}</div>
                )
            }
            {
                posts.othersPosts.length > 0 && (
                    <div>{`Среднее количество лайков на посты, которые пользователь добавил от другого пользователя или группы: ${othersPostsLikesAvg}`}</div>
                )
            }
            {
                posts.userPosts.length > 0 && (
                    <div>{`Общее количество лайков постов, которые пользователь добавил сам: ${userPostsLikesSum}`}</div>
                )
            }
            {
                posts.othersPosts.length > 0 && (
                    <div>{`Общее количество лайков постов, которые пользователь добавил от другого пользователя или группы: ${othersPostsLikesSum}`}</div>
                )
            }
            {
                (posts.userPosts.length > posts.othersPosts.length && posts.othersPosts.length !== 0) && (
                    <div>
                        Пользователь пишет большую часть постов самостоятельно, это может говорить о том, что он активно
                        использует социальную сеть для общения и выражения своих мыслей.
                    </div>
                )
            }
            {
                (posts.userPosts.length > posts.othersPosts.length && posts.othersPosts.length === 0) && (
                    <div>
                        Пользователь пишет все посты самостоятельно, это может говорить о том, что он
                        использует социальную сеть для общения и выражения своих мыслей и любит сам создавать контент,
                        нежели
                        добавлять к себе контент других.
                    </div>
                )
            }
            {
                (posts.othersPosts.length > posts.userPosts.length && posts.userPosts.length !== 0) && (
                    <div>
                        Большую часть постов пользователь репостит, это может говорить о том, что он
                        скорее использует социальную сеть для чтения новостей или следит за активностью своих друзей, но
                        также он не против выражать свои мысли и делиться свой контентом через социальную сеть.
                    </div>
                )
            }
            {
                (posts.othersPosts.length > posts.userPosts.length && posts.userPosts.length === 0) && (
                    <div>
                        Все посты пользователя - это репосты от других групп или пользователей, это может говорить о том,
                        что он
                        скорее использует социальную сеть для чтения новостей или следит за активностью своих друзей.
                    </div>
                )
            }
            {
                posts.userPosts.length === posts.othersPosts.length && (
                    <div>
                        Пользователь в равной степени использует социальную сеть как для того, чтобы следить за
                        активностью друзей и читать новости, так и для того, чтобы делиться своим собственным контентом,
                        выражать мысли.
                    </div>
                )
            }
            {
                (userPostsLikesAvg > othersPostsLikesAvg && posts.userPosts.length > 0 && posts.othersPosts.length > 0) && (
                    <div>
                        Поскольку среднее количество лайков на постах пользователя выше, чем на постах, которые
                        он репостнул к себе, можно предположить, что он пишет более интересные и привлекательные
                        посты, чем те, которые он репостит.
                    </div>
                )
            }
            {
                (othersPostsLikesAvg > userPostsLikesAvg && posts.userPosts.length > 0 && posts.othersPosts.length > 0) && (
                    <div>
                        Поскольку среднее количество лайков на репостах пользователя выше, чем на его постах, можно
                        предположить, что его друзьям больше нравятся те посты, которые он репостит.
                    </div>
                )
            }
        </div>
    );
}
