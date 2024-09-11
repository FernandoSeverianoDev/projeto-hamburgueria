let cart=[]
        let btncarrinho=document.getElementById("cart");
        let btnclosecar=document.getElementById("fechar");
        btncarrinho.addEventListener("click", function abrir(){
            document.querySelector(".carrinho").style.display="flex";
            updatecart();
        })
        btnclosecar.addEventListener("click", function fechar(){
            document.querySelector(".carrinho").style.display="none";
            updatecart();
        })
        var currentTime = new Date();

        horas = currentTime.getHours();
        containeritems = document.querySelector(".itemscontainer")
    
        if(horas<18 || horas > 22){
            document.getElementById("horariofunc").style.backgroundColor="red";
            document.getElementById("buy").addEventListener("click", function(){
                document.querySelector(".mensagem").style.top="5px";
                setTimeout(function baixar(){
                document.querySelector(".mensagem").style.top="-400px";
                }, 7000);
            

            })
        }
        let menu=document.getElementById("produtos");

        menu.addEventListener("click", function (event){
            let parentbutton=event.target.closest(".btnbuy");
            let preco= parseFloat( parentbutton.getAttribute("data-price"));
            let quanty=1;
            let imagemproduct=parentbutton.getAttribute("urlproduto");
            let name=parentbutton.getAttribute("data-name");
            addcart(preco, name, quanty, imagemproduct);
            
            
            

        })


        function addcart(preco, name, quanty, imagemproduct){
            const existi=cart.find(item=>item.name===name);
            
            if(existi){
                existi.quanty+=1;
            }
            else{

                cart.push({
                name,
                preco,
                quanty:1,
                imagemproduct,

            })
                updatecart();
            
            };

    
        
        }
    

        function updatecart(){
            containeritems = document.querySelector(".itemscontainer")
            containeritems.innerHTML=" ";
            total1=0;
            totalitems=0;
            cart.forEach(item=>{
                const carditem=document.createElement("div");
                carditem.innerHTML=`
                <div class="flex">
                    
                    <div class="info">
                        <img src="${item.imagemproduct}" width="78px">
                        <div class="dados">
                        <p>${item.name}</p>
                        <p>R$ ${item.preco},00</p>
                        <p>quantidade ${item.quanty}</p>
                        </div>
                    </div>
                    <div class="button"><button class="btn-remove" data-name="${item.name}">Remover</button></div>
                </div>`
                total1+=item.preco * item.quanty;
                totalitems+=1;
                containeritems.appendChild(carditem);
                document.getElementById("total").innerHTML=total1;
                document.getElementById("itemsbuys").innerHTML=totalitems;
            })
            document.getElementById("total").innerHTML=total1;
            document.getElementById("itemsbuys").innerHTML=totalitems;
            
        }
        itemsconatiner=document.querySelector(".itemscontainer")
        itemsconatiner.addEventListener("click", function verification(event){
            if(event.target.classList.contains("btn-remove")){
                const name1=event.target.getAttribute("data-name");
                
                removeitem(name1)
            }
        })

        function removeitem(name1){
           const index = cart.findIndex(item=>(item.name===name1));
           cart.splice(index, 1);
           updatecart();
        }
        document.getElementById("buy").addEventListener("click", function(){
            inputadress=document.getElementById("endereco");
            if(inputadress.value){
                inputadress.style.border="none";
                document.getElementById("alert").style.display="none";
                inputadress.style.outlineColor="gray";
                if(cart.length===0){
                    document.getElementById("alertbuy").style.display="flex";
                    
                }else{
                    const carditems=cart.map((item)=>{
                        return(`${item.name}, quantidade : ${item.quanty}, preco : ${item.preco}R$ , ENDEREÇO:${inputadress.value} |`)
                            
                    }).join("");
                    const message=encodeURIComponent(carditems);
                    const fone="88994635773";
                    window.open(`https://wa.me/14155555555?text=${carditems}`)
                    cart=[];
                    updatecart();
                    
                }
            
            

            
            }else{
                inputadress.style.border="2px solid red";
                inputadress.style.outlineColor="red";
                document.getElementById("alert").style.display="flex";
                document.getElementById("alertbuy").style.display="none";
            }
        })