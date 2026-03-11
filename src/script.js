let mealsData = [];
async function recipe(){
      document.getElementById("recipie-section").innerHTML=
     `<p class="mx-auto text-5xl">Loading ....</p>`
     const searchValue = document.getElementById("search").value; // NEW (get input value)
    const apiUrl= `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`; //  CHANGED (added searchValue)
    const response= await fetch(apiUrl);
    const data= await response.json();
     //  Error handling
     if(!data.meals){
        document.getElementById("recipie-section").innerHTML =
        `<p class="text-3xl text-center col-span-full">No Data Found</p>`;
        return;
    }
    // console.log(data);
    mealsData = data.meals;   // ⭐ IMPORTANT FIX
    document.getElementById("recipie-section").innerHTML=
    data.meals.map((meal,index)=> {
       return `
       
       <div id="recipie" class="w-auto overflow-hidden shadow rounded flex flex-col  px-2">
       <div>
        <img src="${meal.strMealThumb}" alt="" class="">
        </div>
        <div class="flex flex-col grow">
            <h4 class="mt-2 px-2">${meal.strMeal}</h4>
            <p class="text-gray-600 mt-2 px-2">${meal.strInstructions.substring(0,120)}...</p>
        </div>
        <div class="flex justify-end mt-3 px-2"> 
            <button onclick="openModal('${index}')"  class="bg-orange-500 text-white px-3 py-1 rounded  hover:bg-orange-600">View Details</button>
            </div>
        </div>`;}).join("");
}
recipe();



function openModal(index){
    const meal = mealsData[index];
    document.getElementById("modal-img").src = meal.strMealThumb;
    document.getElementById("modal-title").innerText = meal.strMeal;
    document.getElementById("modal-text").innerText =  meal.strInstructions; 

    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("modal").classList.add("flex");
}

function closeModal(){
    document.getElementById("modal").classList.add("hidden");
}