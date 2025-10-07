const bcrypt = require('bcryptjs');

// Run this to get hashed passwords
const passwords = [
  'password123',
  'password123',
  'password123',
  'password123',
  'password123',
  'password123',
  'password123',
  'password123',
  'password123',
  'password123'
];

passwords.forEach(async (pwd) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pwd, salt);
  console.log(hash);
});

$2a$10$Lx31aMQflrmjxoTaIjEiiuxPr2BMhmcgq0oBMYyjBRbVWL9kIPZdm
$2a$10$qoa5j/XrYBRCFFQSerTN1OFowdKDNqa2bZN0QTKaBcXd2Cjbq7h0K
$2a$10$BhC4XUn1.nXfQwuPDI96.ekdxpLNvjie/Nsl52PPeNKBX21mOzf3K
$2a$10$uDU5NE0JfKCFvwTmvbe73.MC9Mr22DTflmxCzopla6CaNj/fjMC3G
$2a$10$78fkFhfjPPaxvBbay4qYEu7EHw9a.JCZhvKSn./yqbmIy6jQPTyK2
$2a$10$bdp4plCW.vgAqwiTbPCV0OXpb2QK3Mqt4SFZd4v2sbq7uFTCi2bjG
$2a$10$K5B/Pj2nnUA4UHV7RiB/Ne1V5stnbQDbwTmwwl.Rx6gg0LCYLS7wO
$2a$10$XGJm4PSilq0WPz9BFaraCeeUZGmVLmo083czZSIlaqMX0u6/Z/oia
$2a$10$whj96IvJ89ukv0dIJIV/vegY1adKY5CuYGIWoujrEIfhUYkM3jd.a
$2a$10$D6pl/SyRuKB7okt.fAhcausNRP3EV2qQsC6HMqHFPGqYs1w1hKagG

// Insert 10 Users
// All passwords are "password123"
// Run this in MongoDB Compass or mongosh

db.users.insertMany([
  {
    name: "John Smith",
    email: "john.smith@example.com",
    password: "$2a$10$Lx31aMQflrmjxoTaIjEiiuxPr2BMhmcgq0oBMYyjBRbVWL9kIPZdm",
    avatar: "//www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200&r=pg&d=mm",
    date: new Date("2024-01-15")
  },
  {
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    password: "$2a$10$qoa5j/XrYBRCFFQSerTN1OFowdKDNqa2bZN0QTKaBcXd2Cjbq7h0K",
    avatar: "//www.gravatar.com/avatar/305e460b479e2e5b48aec07710c08d50?s=200&r=pg&d=mm",
    date: new Date("2024-02-10")
  },
  {
    name: "Michael Chen",
    email: "michael.chen@example.com",
    password: "$2a$10$XQ3Z4Y5Z6Y7Z8Z9Z0Z1Z2.vZ3Z4Z5Z6Z7Z8Z9Z0Z1Z2Z3Z4Z5Z6Z7Z",
    avatar: "//www.gravatar.com/avatar/405e460b479e2e5b48aec07710c08d50?s=200&r=pg&d=mm",
    date: new Date("2024-03-05")
  },
  {
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    password: "$2a$10$XQ3Z4Y5Z6Y7Z8Z9Z0Z1Z2.vZ3Z4Z5Z6Z7Z8Z9Z0Z1Z2Z3Z4Z5Z6Z7Z",
    avatar: "//www.gravatar.com/avatar/505e460b479e2e5b48aec07710c08d50?s=200&r=pg&d=mm",
    date: new Date("2024-03-20")
  },
  {
    name: "David Kim",
    email: "david.kim@example.com",
    password: "$2a$10$XQ3Z4Y5Z6Y7Z8Z9Z0Z1Z2.vZ3Z4Z5Z6Z7Z8Z9Z0Z1Z2Z3Z4Z5Z6Z7Z",
    avatar: "//www.gravatar.com/avatar/605e460b479e2e5b48aec07710c08d50?s=200&r=pg&d=mm",
    date: new Date("2024-04-12")
  },
  {
    name: "Jessica Martinez",
    email: "jessica.m@example.com",
    password: "$2a$10$XQ3Z4Y5Z6Y7Z8Z9Z0Z1Z2.vZ3Z4Z5Z6Z7Z8Z9Z0Z1Z2Z3Z4Z5Z6Z7Z",
    avatar: "//www.gravatar.com/avatar/705e460b479e2e5b48aec07710c08d50?s=200&r=pg&d=mm",
    date: new Date("2024-05-08")
  },
  {
    name: "Robert Taylor",
    email: "robert.t@example.com",
    password: "$2a$10$XQ3Z4Y5Z6Y7Z8Z9Z0Z1Z2.vZ3Z4Z5Z6Z7Z8Z9Z0Z1Z2Z3Z4Z5Z6Z7Z",
    avatar: "//www.gravatar.com/avatar/805e460b479e2e5b48aec07710c08d50?s=200&r=pg&d=mm",
    date: new Date("2024-06-15")
  },
  {
    name: "Amanda White",
    email: "amanda.w@example.com",
    password: "$2a$10$XQ3Z4Y5Z6Y7Z8Z9Z0Z1Z2.vZ3Z4Z5Z6Z7Z8Z9Z0Z1Z2Z3Z4Z5Z6Z7Z",
    avatar: "//www.gravatar.com/avatar/905e460b479e2e5b48aec07710c08d50?s=200&r=pg&d=mm",
    date: new Date("2024-07-22")
  },
  {
    name: "James Anderson",
    email: "james.a@example.com",
    password: "$2a$10$XQ3Z4Y5Z6Y7Z8Z9Z0Z1Z2.vZ3Z4Z5Z6Z7Z8Z9Z0Z1Z2Z3Z4Z5Z6Z7Z",
    avatar: "//www.gravatar.com/avatar/a05e460b479e2e5b48aec07710c08d50?s=200&r=pg&d=mm",
    date: new Date("2024-08-10")
  },
  {
    name: "Lisa Brown",
    email: "lisa.b@example.com",
    password: "$2a$10$XQ3Z4Y5Z6Y7Z8Z9Z0Z1Z2.vZ3Z4Z5Z6Z7Z8Z9Z0Z1Z2Z3Z4Z5Z6Z7Z",
    avatar: "//www.gravatar.com/avatar/b05e460b479e2e5b48aec07710c08d50?s=200&r=pg&d=mm",
    date: new Date("2024-09-05")
  }
]);