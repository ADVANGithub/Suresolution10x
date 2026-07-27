document.addEventListener("DOMContentLoaded", function(){

    // ==========================
    // VIEW MORE
    // ==========================

    document.querySelectorAll(".view-more").forEach(button=>{

        button.addEventListener("click",function(){

            const text=this.parentElement.querySelector(".review-text");

            text.classList.toggle("expanded");

            this.innerHTML=text.classList.contains("expanded")

            ?'View Less <i class="fa-solid fa-angle-up"></i>'

            :'View More <i class="fa-solid fa-angle-down"></i>';

        });

    });

    // ==========================
    // STAR RATING
    // ==========================

    document.querySelectorAll(".review-card").forEach(card=>{

        const stars=card.querySelectorAll(".star");

        const rating=card.querySelector(".rating-number");

        stars.forEach((star,index)=>{

            star.addEventListener("click",()=>{

                stars.forEach((s,i)=>{

                    s.classList.toggle("active",i<=index);

                });

                rating.innerText=(index+1)+".0";

            });

        });

    });

    // ==========================
    // LIKE
    // ==========================

    document.querySelectorAll(".like-btn").forEach(button=>{

        button.addEventListener("click",function(){

            const count=this.querySelector(".like-count");

            let value=parseInt(count.innerText);

            if(!this.classList.contains("active")){

                value++;

                count.innerText=value;

                this.classList.add("active");

            }

            else{

                value--;

                count.innerText=value;

                this.classList.remove("active");

            }

        });

    });

    // ==========================
    // DISLIKE
    // ==========================

    document.querySelectorAll(".dislike-btn").forEach(button=>{

        button.addEventListener("click",function(){

            const count=this.querySelector(".dislike-count");

            let value=parseInt(count.innerText);

            if(!this.classList.contains("active")){

                value++;

                count.innerText=value;

                this.classList.add("active");

            }

            else{

                value--;

                count.innerText=value;

                this.classList.remove("active");

            }

        });

    });

});