import bcrypt from 'bcryptjs';

const data = {
    users:[
        {
            name: 'Basir',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
          },
          {
            name: 'John',
            email: 'user@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
          },
    ],
    Games: [
        {
            //_id: '1',
            name: 'foundation',
            slug: 'foundation',
            category: 'city builder',
            image:'/image/foundation.jpg',
            price: 18,
            countInStock: 13,
            gameDeveloper: 'foundation dev',
            rating: 8.5,
            numReviews: 50,
            description: 'City builder in medieval time',
        },
        {
            //_id: '2',
            name: 'Construction simulator',
            slug: 'Construction-Simulator',
            category: 'Simulation',
            image:'/image/construction-simulator.jpg',
            price: 30,
            countInStock: 25,
            gameDeveloper: 'Construction simulator dev',
            rating: 6.5,
            numReviews: 26,
            description: 'Simulation de site de construction',
        },
        {
            //_id: '3',
            name: 'Sheltered',
            slug: 'Sheltered',
            category: 'Simulation',
            image:'/image/sheltered.jpg',
            price: 15,
            countInStock: 0,
            gameDeveloper: 'foundation dev',
            rating: 9.5,
            numReviews: 100,
            description: 'Post apo survival',
        },
    ],
};
export default data;