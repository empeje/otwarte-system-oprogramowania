library(tidyverse)
library(dslabs)
data("heights")

s <- heights %>% filter(sex == "Male") %>% summarize(average=mean(height), standard_deviation=sd(height))
s


s$average
s$standard_deviation

heights %>% filter(sex=="Female") %>% summarize(median = median(height), minimum = min(height), maximum = max(height))

quantile(heights$height)


heights %>% filter(sex =="Male") %>% summarize(range = quantile(height, c(0, 0.5, 1)))

# murders data

data(murders)
murders <- murders %>% mutate(murder_rate = total/population * 100000)
summarize(murders, mean(murder_rate))

us_murder_rate <- murders %>% summarize(rate = sum(total)/sum(population) * 100000)
us_murder_rate %>% .$rate
class(us_murder_rate %>% .$rate)


us_murder_rate <- murders %>% summarize(rate = sum(total)/sum(population) * 100000) %>% .$rate
us_murder_rate

us_murder_rate <- murders %>% summarize(rate = sum(total)/sum(population) * 100000) %>% pull(rate)
us_murder_rate

# group by

heights %>% group_by(sex) %>% summarize(average=mean(height), standard_deviation=sd(height))


murders %>% group_by(region) %>% summarize(average=mean(murder_rate), standard_deviation=sd(murder_rate))


# arrange

murders %>% arrange(population) %>% head()
murders %>% arrange(murder_rate) %>% head()
murders %>% arrange(desc(murder_rate)) %>% head()
murders %>% arrange(region, murder_rate) %>% head()
murders %>% arrange(desc(murder_rate)) %>% top_n(10)

library(dplyr)
library(NHANES)
data(NHANES)
## modify the code we wrote for previous exercise.
ref_avg <- NHANES %>%
  filter(AgeDecade == " 20-29" & Gender == "female") %>%
  summarize(average = mean(BPSysAve, na.rm = TRUE),
            standard_deviation = sd(BPSysAve, na.rm=TRUE))