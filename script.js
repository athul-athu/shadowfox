// Sample data for RCB players
const players = [
    {
        name: 'Virat Kohli',
        role: 'Batsman',
        category: 'batsman',
        image: 'https://wallpapercave.com/wp/wp6636574.jpg',
        stats: '6,000+ runs',
        jerseyNumber: '18',
        nationality: 'Indian',
        description: 'RCB captain and one of the best batsmen in world cricket.'
    },
    {
        name: 'AB de Villiers',
        role: 'Batsman',
        category: 'batsman',
        image: 'https://wallpaperaccess.com/full/5015378.jpg',
        stats: '5,000+ runs',
        jerseyNumber: '17',
        nationality: 'South African',
        description: 'A genius with the bat and one of the most exciting players in IPL history.'
    },
    {
        name: 'Glenn Maxwell',
        role: 'All-rounder',
        category: 'all-rounder',
        image: 'https://documents.iplt20.com/ipl/IPLHeadshot2024/28.png',
        stats: '2,500+ runs, 50+ wickets',
        jerseyNumber: '8',
        nationality: 'Australian',
        description: 'Explosive all-rounder, known for his destructive batting and handy bowling.'
    },
    {
        name: 'Yuzvendra Chahal',
        role: 'Bowler',
        category: 'bowler',
        image: 'https://wallpapercave.com/wp/wp9060663.jpg',
        stats: '125+ wickets',
        jerseyNumber: '3',
        nationality: 'Indian',
        description: 'RCB’s leading leg-spinner and one of the best in T20 cricket.'
    },
    {
        name: 'Mohammad Siraj',
        role: 'Bowler',
        category: 'bowler',
        image: 'https://staticg.sportskeeda.com/editor/2021/04/4201d-16178582077078-800.jpg',
        stats: '50+ wickets',
        jerseyNumber: '59',
        nationality: 'Indian',
        description: 'Fast bowler known for his ability to bowl in the death overs.'
    },
    {
        name: 'Dinesh karthik',
        role: 'wicket-keeper',
        category: 'wicket-keeper',
        image: 'https://documents.iplt20.com/ipl/IPLHeadshot2024/13.png',
        stats: '5+ wickets',
        jerseyNumber: '100',
        nationality: 'India',
        description: 'Explosive keeper and useful fielder known for its aggressive style of play'
    },
    {
        name: 'Kyle Jamieson',
        role: 'Bowler',
        category: 'bowler',
        image: 'https://images.mid-day.com/images/images/2021/aug/Kyle-Jamieson-pti-rcb_d.jpg',
        stats: '10 wickets in the IPL',
        jerseyNumber: '11',
        nationality: 'New Zealand',
        description: 'Tall fast bowler with good bounce and has the potential to make an impact with the ball.'
    },
    {
        name: 'Harshal Patel',
        role: 'Bowler',
        category: 'bowler',
        image: 'https://th.bing.com/th/id/OIP.Kz-B-wN3oCznsNwFHmjGvwHaHa?rs=1&pid=ImgDetMain',
        stats: '50+ wickets',
        jerseyNumber: '8',
        nationality: 'Indian',
        description: 'RCB’s premier death bowler and purple cap winner in IPL 2021.'
    },
    {
        name: 'Devdutt Padikkal',
        role: 'Batsman',
        category: 'batsman',
        image: 'https://th.bing.com/th/id/OIP.BkigKNemFE_PJjUD_uRoGAHaHa?rs=1&pid=ImgDetMain',
        stats: '1,000+ runs',
        jerseyNumber: '4',
        nationality: 'Indian',
        description: 'An elegant left-handed opener who has made a strong impact in IPL.'
    },
    {
        name: 'Dan Christian',
        role: 'All-rounder',
        category: 'all-rounder',
        image: 'https://images.news18.com/ibnlive/uploads/2021/04/1617709368_dan-christian.jpg?impolicy=website&width=0&height=0',
        stats: '2,000+ runs, 100+ wickets',
        jerseyNumber: '23',
        nationality: 'Australian',
        description: 'Hard-hitting all-rounder with valuable experience in T20 cricket.'
    }
];

// Function to populate players grid
function populatePlayers() {
    const playersGrid = document.getElementById('players-grid');
    if (!playersGrid) return;

    playersGrid.innerHTML = '';
    players.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300';
        playerCard.setAttribute('data-category', player.category);
        
        playerCard.innerHTML = `
            <div class="relative">
                <img src="${player.image}" alt="${player.name}" class="w-full h-64 object-cover">
                <div class="absolute top-0 right-0 bg-green-600 text-blue-900 px-3 py-1 rounded-bl-lg font-bold">
                    #${player.jerseyNumber}
                </div>
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 class="text-white text-xl font-bold">${player.name}</h3>
                    <p class="text-red-800">${player.role}</p>
                </div>
            </div>
            <div class="p-4">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-gray-600">${player.nationality}</span>
                    <span class="text-sm text-gray-500">${player.stats}</span>
                </div>
                <p class="text-gray-700 text-sm">${player.description}</p>
            </div>
        `;
        
        playersGrid.appendChild(playerCard);
    });
}

// Initialize the player grid when the page loads
document.addEventListener('DOMContentLoaded', () => {
    populatePlayers();
});
