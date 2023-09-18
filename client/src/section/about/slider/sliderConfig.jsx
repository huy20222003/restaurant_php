const sliderConfig = [
    {
        id: 1,
        name: 'Nguyen Quang Huy',
        position: 'Developer',
        image: '/assets/images/background/hero.jpg'
    },
    {
        id: 2,
        name: 'Le Dinh Huy',
        position: 'Business Analyst',
        image: 'https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/278745910_1433406197130356_2033178127069133295_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=6wcHr2T7U4MAX_tLAZw&_nc_ht=scontent.fhan14-3.fna&oh=00_AfDOjz2bSC70Gwwz8JgwiahJXMVX1O-k9A2ziQOYmLwPbg&oe=650AF552'
    },
    {
        id: 3,
        name: 'Le Hoang Anh',
        position: 'Business Analyst',
        image: 'https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/354583874_1307502466834612_3765342395527532438_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=V-MWsJ0FRBIAX95M3K4&_nc_ht=scontent.fhan14-3.fna&oh=00_AfARQ9rVZX98_mqdpLcOjvX_66sFe_amCv91o2mGzyB2Yg&oe=650BB543'
    },
    {
        id: 4,
        name: 'Nguyen Van Hai',
        position: 'Tester',
        image: 'https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/280191361_758293615535167_6577940276796782749_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=yXLa491CKqsAX_6B2XR&_nc_ht=scontent.fhan14-4.fna&oh=00_AfBjWp8vBXZh2IgSTQnpWOaYky6Nb2IdD_0Q-YJydfffRA&oe=650AD59F'
    },
    {
        id: 5,
        name: 'Nguyen Quang Huy',
        position: 'Developer',
        image: '/assets/images/background/hero.jpg'
    },
    {
        id: 6,
        name: 'Le Dinh Huy',
        position: 'Business Analyst',
        image: 'https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/278745910_1433406197130356_2033178127069133295_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=6wcHr2T7U4MAX_tLAZw&_nc_ht=scontent.fhan14-3.fna&oh=00_AfDOjz2bSC70Gwwz8JgwiahJXMVX1O-k9A2ziQOYmLwPbg&oe=650AF552'
    },
    {
        id: 7,
        name: 'Le Hoang Anh',
        position: 'Business Analyst',
        image: 'https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/354583874_1307502466834612_3765342395527532438_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=V-MWsJ0FRBIAX95M3K4&_nc_ht=scontent.fhan14-3.fna&oh=00_AfARQ9rVZX98_mqdpLcOjvX_66sFe_amCv91o2mGzyB2Yg&oe=650BB543'
    },
    {
        id: 8,
        name: 'Nguyen Van Hai',
        position: 'Tester',
        image: 'https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/280191361_758293615535167_6577940276796782749_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=yXLa491CKqsAX_6B2XR&_nc_ht=scontent.fhan14-4.fna&oh=00_AfBjWp8vBXZh2IgSTQnpWOaYky6Nb2IdD_0Q-YJydfffRA&oe=650AD59F'
    },
    {
        id: 9,
        name: 'Nguyen Quang Huy',
        position: 'Developer',
        image: '/assets/images/background/hero.jpg'
    },
    {
        id: 10,
        name: 'Le Dinh Huy',
        position: 'Business Analyst',
        image: 'https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/278745910_1433406197130356_2033178127069133295_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=6wcHr2T7U4MAX_tLAZw&_nc_ht=scontent.fhan14-3.fna&oh=00_AfDOjz2bSC70Gwwz8JgwiahJXMVX1O-k9A2ziQOYmLwPbg&oe=650AF552'
    },
    {
        id: 11,
        name: 'Le Hoang Anh',
        position: 'Business Analyst',
        image: 'https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/354583874_1307502466834612_3765342395527532438_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=V-MWsJ0FRBIAX95M3K4&_nc_ht=scontent.fhan14-3.fna&oh=00_AfARQ9rVZX98_mqdpLcOjvX_66sFe_amCv91o2mGzyB2Yg&oe=650BB543'
    },
    {
        id: 12,
        name: 'Nguyen Van Hai',
        position: 'Tester',
        image: 'https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/280191361_758293615535167_6577940276796782749_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=yXLa491CKqsAX_6B2XR&_nc_ht=scontent.fhan14-4.fna&oh=00_AfBjWp8vBXZh2IgSTQnpWOaYky6Nb2IdD_0Q-YJydfffRA&oe=650AD59F'
    },
]

export default sliderConfig;