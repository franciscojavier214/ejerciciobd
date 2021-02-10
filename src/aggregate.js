// mostraresmos los articulos que se adquirieron despues del 25 de enero de 2020, calcularemos el beneficio de sus supuestas ventas
// agruparemos segun los articulos y sus vendedores, ademas filstramos por aquellos con un coste de transporte inferior a 100.
db.v2.aggregate(
    [{
        $match: { 
            fecha_adquisición:{$gt:new Date("2020-01-25")}
        }
    },{ $project:
        {
            _id : 0 ,
            artículo: 1,
            vendedor:1,
            número_unidades:1,
            beneficios: {$subtract:
            [
                {$multiply: ["$precio_unitario", "$número_unidades" ]},
                {$multiply: ["$precio_unitario_por_mayor", "$número_unidades" ]}
            ]}
        } 
    },
        { $group:
            {
                _id:{
                    artículo:"$artículo",
                    vendedor:"$vendedor"
                },
                stock: {$sum: "$número_unidades"
                }
            }
        },{
            $match: { 
                $expr:{
                    $lt:["$coste_transporte",100]
                }
            
            }
        },
        {$sort: {precio_unitario:-1} }
    ]
)
/*
{ "_id" : { "artículo" : "Frigorífico", "vendedor" : "Herrajes Andalucía" }, "stock" : 16 }
{ "_id" : { "artículo" : "Congelador", "vendedor" : "Suministros Climastock" }, "stock" : 16 }
{ "_id" : { "artículo" : "Aire Acondicionado", "vendedor" : "Reverse Container" }, "stock" : 10 }
{ "_id" : { "artículo" : "    Frigorífico", "vendedor" : "Suministros Climastock" }, "stock" : 8 }
{ "_id" : { "artículo" : "Microondas", "vendedor" : "Frigeria Hostelería" }, "stock" : 14 }
{ "_id" : { "artículo" : "Aire Acondicionado", "vendedor" : "Herrajes Andalucía" }, "stock" : 12 }
{ "_id" : { "artículo" : "Aire Acondicionado", "vendedor" : "Suministros Climastock" }, "stock" : 14 }
{ "_id" : { "artículo" : "Aire acondicionado", "vendedor" : "Suministros Climastock" }, "stock" : 10 }
{ "_id" : { "artículo" : "Microondas", "vendedor" : "Reverse Container" }, "stock" : 12 }
{ "_id" : { "artículo" : "Frigorífico", "vendedor" : "Reverse Container" }, "stock" : 16 }
{ "_id" : { "artículo" : "Horno eléctrico", "vendedor" : "Equipamiento de Hostelería J. Rafael Cámara" }, "stock" : 6 }
*/