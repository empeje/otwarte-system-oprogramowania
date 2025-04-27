library(tidyverse)
library(dslabs)

data("murders")

murders %>%
  ggplot(aes(population, total, label = abb, color = region)) +
  geom_label()

## this is to calculate quadratic equation solution
## Code to compute solution to quadratic
## equation of the form ax^2 + bx + c
a <- 2
b <- -1
c <- -4

## now compute the solution
solution_2 <- (-b + sqrt(b^2 - 4*a*c))/ (2*a)
solution_1 <- (-b - sqrt(b^2 - 4*a*c))/ (2*a)

## Factor is categorical
data("murders")
class(murders$region)
