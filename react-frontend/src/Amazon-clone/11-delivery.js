export const delivery=[
    {
        id:'1',
        day:7,
        price:0
        
    },
    {
        id:'2',
        day:3,
        price:499
        
    },
    {
        id:'3',
        day:1,
        price:999
        
    },
]
export function dvoption(cartdelid){
    let doption
    delivery.forEach((d)=>{
        if(d.id===cartdelid){
            doption=d
        }
    })
    return doption || delivery[0]
}