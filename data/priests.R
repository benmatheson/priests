library(tidyverse)
library(jsonlite)
library(readxl)

setwd('projects/priests/data')
getwd()

priestRaw <- read_xls("priests for mapping.xls")

View(priestRaw)
locations <- read_csv("communities.csv")



View(priests)
priests <- priestRaw %>% select(-`PRIESTS & YEARS STATIONED HERE`)
priests <- priests %>% select (-20, -21) 
priestGather <- priests %>% gather(key="loc", value="priests", 3:19, na.rm=T)
priestGather <- priestGather %>%  mutate(location_simple = LOCATION)

# priestGather[,priestGather$LOCATION == `St. Mary's / Akulurak`]$location_simple <- "Saint Marys"

priestGather <- priestGather %>% mutate(location_simple = ifelse(LOCATION =="St. Mary's / Akulurak","Saint Mary's", location_simple))
priestGather <- priestGather %>% mutate(location_simple = ifelse(LOCATION =="Glennallen / Copper Valley School", "Glennallen", location_simple))
priestGather <- priestGather %>% mutate(location_simple = ifelse(LOCATION =="Barrow / Utqiagvik", "Barrow (Utqiagvik)", location_simple))
priestGather <- priestGather %>% mutate(location_simple = ifelse(LOCATION =="Nunam Iqua / Sheldon Point", "Nunam Iqua", location_simple))
priestGather <- priestGather %>% mutate(location_simple = ifelse(LOCATION =="St. Michael", "Saint Michael", location_simple))



priestGatherGeo <- left_join(priestGather, locations, by=c('location_simple' ='Community Name'))

unqLoc <- unique(priestGatherGeo$location_simple)
loc <- priestGatherGeo %>% distinct(location_simple, .keep_all =T)

View(loc)
loc <- loc %>% select(-1,-3,-4)
write_csv(loc, "loc.csv")



##st maichal, barrow, sheldon point, st mary's glenallen. 

write_json(priestGatherGeo,"priestGatherGeo.json")



