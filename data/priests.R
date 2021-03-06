library(tidyverse)
library(jsonlite)
library(readxl)

setwd('projects/priests/data')
getwd()

priestRawOld <- read_xls("priests for mapping.xls")
priestRaw <- read_xls("priests for mapping - with population and titles.xls")


View(priestRaw)
locations <- read_csv("communities.csv")


population <- priestRaw$`CURRENT POPULATION`
communityNames <- priestRaw$LOCATION

pop_df <- data.frame(communityNames, population)






View(priests)
priests <- priestRaw %>% select(-`PRIESTS ACCUSED OF SEX ABUSE / YEARS STATIONED HERE`)
priests <- priests %>% select (-`CURRENT POPULATION`)
priests <- priests %>% select (-20, -21) 
priestGather <- priests %>% gather(key="loc", value="priests", 3:19, na.rm=T)
priestGather <- priestGather %>%  mutate(location_simple = LOCATION)

# priestGather[,priestGather$LOCATION == `St. Mary's / Akulurak`]$location_simple <- "Saint Marys"

priestGather <- priestGather %>% mutate(location_simple = ifelse(LOCATION =="St. Marys / Akulurak","Saint Mary's", location_simple))
priestGather <- priestGather %>% mutate(location_simple = ifelse(LOCATION =="Glennallen / Copper Valley School", "Glennallen", location_simple))
priestGather <- priestGather %>% mutate(location_simple = ifelse(LOCATION =="Barrow / Utqiagvik", "Barrow (Utqiagvik)", location_simple))
priestGather <- priestGather %>% mutate(location_simple = ifelse(LOCATION =="Nunam Iqua / Sheldon Point", "Nunam Iqua", location_simple))
priestGather <- priestGather %>% mutate(location_simple = ifelse(LOCATION =="St. Michael", "Saint Michael", location_simple))



priestGatherGeo <- left_join(priestGather, locations, by=c('location_simple' ='Community Name'))


##for getting the sum of 
priestGatherGeoSum <- priestGatherGeo %>% filter (loc != "NOTES")
priestSum <- priestGatherGeoSum %>% group_by(LOCATION) %>% summarise(total = n())
View(priestSum)

unqLoc <- unique(priestGatherGeo$location_simple)
loc <- priestGatherGeo %>% distinct(location_simple, .keep_all =T)
loc <- loc %>% select(-1,-3,-4)

locPop <- left_join(loc, pop_df, by=c('LOCATION' = "communityNames") )
locPop <- left_join(locPop, priestSum, by = c("LOCATION"= "LOCATION"))


write_csv(locPop, "locPop.csv")



write_json(priestGatherGeo,"priestGatherGeo_12_21.json")



