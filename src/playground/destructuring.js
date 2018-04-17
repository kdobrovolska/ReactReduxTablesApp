const person={
    age:25,
    lacation:{
        city:'XX',
        temp:88
    }
};

const {name:PersonName='Tom', age}=person;
console.log(PersonName);
console.log(age);

const ar=[ 'grogorenko','kiev','ukraine', '02247'];

const [,city,,name='sasha']=ar;
console.log('city -'+city);
console.log('name -'+name);
const item=['cofee', 1, 2,3];
const[cof,,medium]=item;
console.log(cof+' medium price is '+ medium);